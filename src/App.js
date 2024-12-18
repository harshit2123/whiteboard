import Board from "./componenets/Board";
import Toolbar from "./componenets/ToolBar";
import BoardProvider from "./store/board-provider";

function App() {
  return (
    <BoardProvider>
      <Toolbar />
      <Board />
    </BoardProvider>
  );
}

export default App;
