#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-interactive-25617-7eb66dd6/tic_tac_toe_game
./gradlew lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
   exit 1
fi

