import Todolist from './components/Todolist'

export const App = () => {
  return (
    <div className="App">
      <div className="Widget">
        <header className="Widget-header">
          <h1>Valstro Frontend Challenge:</h1>
          <p>
            Insert messages in a form below and see a list of messages (with the
            ability to remove) update across multiple tabs/windows in realtime
            using the <code>BroadcastChannel API</code>.
          </p>
          <p>
            Refresh the page and see the message list persisted using the{" "}
            <code>LocalStorage API</code>.
          </p>
        </header>

        {/* <div>[MESSAGE_FORM]</div>
        <div>[MESSAGE_LIST]</div>
        <div>[MESSAGE] [MESSAGE_REMOVE_BUTTON]</div>
        <div>[/MESSAGE_LIST]</div> */}
        <main style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
        <Todolist />
        </main>
      </div>
    </div>
  );
};

export default App;
