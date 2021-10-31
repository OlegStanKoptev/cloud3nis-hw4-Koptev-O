import React, {useEffect, useLayoutEffect} from 'react';
import {Button, FlatList, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoaded,
  selectIsLoading,
  selectNotes,
  selectUpdateList,
} from '../modules/notes/selectors';
import {createNote, loadNotes} from '../modules/notes/actions';
import {penguins} from '../res/penguins';

export const NotesList = ({navigation}) => {
  const notesList = useSelector(selectNotes);
  const isLoading = useSelector(selectIsLoading);
  const isLoaded = useSelector(selectIsLoaded);
  const updateList = useSelector(selectUpdateList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadNotes());
    }
  }, [dispatch, isLoaded, notesList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            const note = {
              title: 'Note Title',
              image: penguins,
            };
            dispatch(createNote(note));
          }}
          title="New"
        />
      ),
      headerLeft: () => (
        <Button
          onPress={() => {
            dispatch(loadNotes());
          }}
          title="Update"
        />
      ),
    });
  }, [dispatch, navigation]);
  const NotesListItem = ({item}) => {
    const navigate = () => {
      navigation.navigate('Note', {noteId: item.id});
    };
    let shortContent = item.content?.substr(
      0,
      item.content?.indexOf('\n') === -1
        ? item.content?.length
        : item.content?.indexOf('\n'),
    );
    if (!shortContent) {
      shortContent = 'Empty content';
    }
    return (
      <TouchableHighlight onPress={navigate}>
        <View style={{backgroundColor: 'white'}}>
          <View style={{padding: 12}}>
            <Text style={{fontSize: 18}} numberOfLines={1}>
              {item.title}
            </Text>
            <Text numberOfLines={1}>{shortContent}</Text>
          </View>
          <View style={{backgroundColor: '#EEE', height: 1, marginLeft: 12}} />
        </View>
      </TouchableHighlight>
    );
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={notesList}
        renderItem={NotesListItem}
        extraData={updateList}
        keyExtractor={i => i.id}
      />
    );
  }
};
