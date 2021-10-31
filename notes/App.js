import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NotesList} from './components/NotesList';
import {Note} from './components/Note';
import {penguins} from './res/penguins';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/notes/reducer';
import rootSaga from './modules/sagas';

const Stack = createNativeStackNavigator();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

window.store = store;
sagaMiddleware.run(rootSaga);

const App = () => {
  // const [notes, setNotes] = useState(DATA);
  // const [listUpdate, setListUpdate] = useState(false);
  // const switchListUpdate = () => setListUpdate(!listUpdate);

  return (
    // <MyContext.Provider
    //   value={{
    //     notes: notes,
    //     setNotes: setNotes,
    //     listUpdateState: listUpdate,
    //     updateList: switchListUpdate,
    //   }}>
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="NotesList">
          {/* eslint-disable-next-line prettier/prettier */}
          <Stack.Screen name="NotesList" component={NotesList} options={{title: 'Notes'}}/>
          <Stack.Screen name="Note" component={Note} options={{title: ''}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </MyContext.Provider>
  );
};

export default App;
