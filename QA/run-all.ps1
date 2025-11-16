param(
    [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

Write-Host "==[ QA Sync GPT Hub – build & tests ]==" -ForegroundColor Cyan

# 1) Build Next.js
Write-Host "1) npm run build" -ForegroundColor Yellow
npm run build

# 2) Lancer le serveur en arrière-plan
Write-Host "2) npm run start (serveur Next)..." -ForegroundColor Yellow
$server = Start-Process "npm" "run start" -NoNewWindow -PassThru

# On laisse le temps au serveur de démarrer
Start-Sleep -Seconds 20

# 3) Créer le dossier de rapports
New-Item -ItemType Directory -Path ".\QA" -Force | Out-Null

# 4) Lighthouse CI – perf / accessibilité / SEO
Write-Host "3) Lighthouse CI (home + dashboard)..." -ForegroundColor Yellow
npx lhci autorun `
  --collect.url="$BaseUrl/" `
  --collect.url="$BaseUrl/dashboard" `
  --upload.target=filesystem `
  --upload.outputDir="QA/lhci" `
  --assert.assertions."categories:performance"="error:0.90" `
  --assert.assertions."categories:accessibility"="error:0.90" `
  --assert.assertions."categories:seo"="error:1.00"

# 5) Pa11y – accessibilité WCAG
Write-Host "4) Pa11y (accessibilité)..." -ForegroundColor Yellow
npx pa11y "$BaseUrl/" --reporter json > "QA/pa11y-home.json"
npx pa11y "$BaseUrl/dashboard" --reporter json > "QA/pa11y-dashboard.json"

# 6) axe-core – scan a11y complémentaire
Write-Host "5) axe-core (scan a11y complémentaire)..." -ForegroundColor Yellow
npx axe "$BaseUrl/" --save "QA/axe-home.json"
npx axe "$BaseUrl/dashboard" --save "QA/axe-dashboard.json"

# 7) HTMLHint – qualité HTML (si tu as du HTML exporté / statique)
Write-Host "6) HTMLHint (qualité HTML)..." -ForegroundColor Yellow
if (Test-Path ".\out") {
    npx htmlhint ".\out\**\*.html" --format=json > "QA/htmlhint.json"
} else {
    Write-Host "Dossier .\out non trouvé – skip HTMLHint (tu peux utiliser next export plus tard)." -ForegroundColor DarkYellow
}

# 8) webhint – bonnes pratiques front / SEO technique
Write-Host "7) webhint (hint)..." -ForegroundColor Yellow
npx hint "$BaseUrl/" --telemetry=off > "QA/webhint-home.txt"

# 9) Arrêt du serveur
Write-Host "8) Arrêt du serveur Next..." -ForegroundColor Yellow
if ($server -and !$server.HasExited) {
    Stop-Process -Id $server.Id -Force
}

Write-Host "==[ QA terminée – rapports dans le dossier .\QA ]==" -ForegroundColor Green
