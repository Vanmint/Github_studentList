import List from '~/List'
import Add from '~/Add'
import store from './redux/store'
import { Provider } from 'react-redux'

// export const showContext = createContext()

function App() {
    return (
        <Provider store={store}>
            <>
                <Add />
                <List />
            </>
        </Provider>
    )
}

export default App;
