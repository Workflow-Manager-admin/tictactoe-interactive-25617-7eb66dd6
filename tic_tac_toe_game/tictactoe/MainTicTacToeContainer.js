import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// PUBLIC_INTERFACE
export default function MainTicTacToeContainer() {
  // Game state: '' for empty, 'X' or 'O'
  const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // PUBLIC_INTERFACE
  function handlePress(row, col) {
    if (board[row][col] !== '' || winner) return;
    const newBoard = board.map(arr => arr.slice());
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const detectedWinner = checkWinner(newBoard);
    if (detectedWinner) {
      setWinner(detectedWinner);
    } else if (newBoard.flat().every(cell => cell !== '')) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  }

  // PUBLIC_INTERFACE
  function checkWinner(brd) {
    // Rows and columns
    for (let i = 0; i < 3; i++) {
      if (brd[i][0] && brd[i][0] === brd[i][1] && brd[i][1] === brd[i][2]) return brd[i][0];
      if (brd[0][i] && brd[0][i] === brd[1][i] && brd[1][i] === brd[2][i]) return brd[0][i];
    }
    // Diagonals
    if (brd[0][0] && brd[0][0] === brd[1][1] && brd[1][1] === brd[2][2]) return brd[0][0];
    if (brd[0][2] && brd[0][2] === brd[1][1] && brd[1][1] === brd[2][0]) return brd[0][2];
    return null;
  }

  // UI
  function renderCell(row, col) {
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={styles.cell}
        activeOpacity={0.7}
        onPress={() => handlePress(row, col)}
        accessibilityLabel={`Cell ${row * 3 + col + 1}`}
      >
        <Text style={[
          styles.cellText,
          {
            color: board[row][col] === 'X'
              ? colors.accent
              : board[row][col] === 'O'
                ? colors.secondary
                : colors.secondary + '66', // faded for empty
          },
        ]}>
          {board[row][col]}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredCol}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <View style={styles.statusContainer}>
          {!winner && !isDraw && (
            <Text style={styles.statusText}>
              Turn: <Text style={{fontWeight:'bold', color: currentPlayer === 'X' ? colors.accent : colors.secondary}}>{currentPlayer}</Text>
            </Text>
          )}
          {winner && (
            <Text style={[styles.statusText, {color: colors.accent}]}>
              Winner: <Text style={{fontWeight:'bold'}}>{winner}</Text> 🎉
            </Text>
          )}
          {isDraw && !winner && (
            <Text style={styles.statusText}>
              Draw! 🤝
            </Text>
          )}
        </View>
        <View style={styles.board}>
          {board.map((rowArr, rowIdx) => (
            <View key={rowIdx} style={styles.boardRow}>
              {rowArr.map((cell, colIdx) => renderCell(rowIdx, colIdx))}
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={resetGame}
          accessibilityLabel="Reset Game"
        >
          <Text style={styles.resetBtnText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  primary: '#ffffff', // background
  secondary: '#222222', // text, O
  accent: '#4caf50', // X, highlights
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredCol: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 24,
    letterSpacing: 1,
  },
  statusContainer: {
    minHeight: 32,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 18,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  board: {
    aspectRatio: 1,
    width: 280,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#0002',
    marginBottom: 28,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardRow: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    margin: 2,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  resetBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 18,
    elevation: 1,
  },
  resetBtnText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});
