#!/bin/bash
#
# LOKAL UTVECKLINGSSERVER
# =======================
# Kör detta skript för att se din webbsida direkt i webbläsaren!
# Ändringar syns direkt när du laddar om sidan (F5).
#

echo ""
echo "=============================================="
echo "   LOKAL UTVECKLINGSSERVER STARTAR!"
echo "=============================================="
echo ""
echo "Din webbsida finns nu på:"
echo ""
echo "   http://localhost:8000"
echo ""
echo "   Startsida:     http://localhost:8000/index.html"
echo "   AI Quiz:       http://localhost:8000/ai-quiz-generator.html"
echo ""
echo "----------------------------------------------"
echo "   Tryck Ctrl+C för att stoppa servern"
echo "----------------------------------------------"
echo ""

# Starta en enkel webbserver
cd "$(dirname "$0")"
python3 -m http.server 8000
