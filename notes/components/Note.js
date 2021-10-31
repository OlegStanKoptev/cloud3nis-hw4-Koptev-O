import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  TextInput,
  ScrollView,
  Keyboard,
  InputAccessoryView,
  Button,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {createNote, loadNotes, updateNote} from '../modules/notes/actions';

export const Note = ({navigation, route}) => {
  const noteId = route.params.noteId;
  const note = useSelector(
    state => state.notes.find(e => e.id === noteId) ?? null,
  );
  const dispatch = useDispatch();

  const inputAccessoryViewID = 'uniqueID';
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    return () => keyboardWillShowListener.remove();
  });

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [image, setImage] = useState(note.image);
  const updateTitle = value => {
    value = value?.replace(/^\n+|\n+$/g, '');
    setTitle(value);
  };
  const updateContent = value => {
    setContent(value);
  };
  const updateImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxHeight: 600, maxWidth: 400, includeBase64: true},
      response => {
        if (response.assets !== undefined && response.assets.length === 1) {
          let importedImg =
            'data:image/png;base64,' + response.assets[0].base64;
          setImage(importedImg);
          // onChange({image: importedImg});
        }
      },
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(
              updateNote({
                id: noteId,
                title: title.trim(),
                content: content.trim(),
                image: image,
              }),
            );
          }}
          title="Save"
        />
      ),
    });
  }, [navigation, dispatch, noteId, title, content, image]);
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{padding: 8, backgroundColor: 'white'}}
        contentContainerStyle={{paddingBottom: keyboardHeight + 48}}
        keyboardDismissMode="interactive">
        <TouchableOpacity onPress={updateImage} underlayColor="gray">
          <ImageBackground
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              width: '100%',
              aspectRatio: 3 / 2,
            }}
            source={{uri: image}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  padding: 8,
                  fontSize: 16,
                  color: 'white',
                  textShadowColor: 'black',
                  textShadowRadius: 8,
                }}>
                replace
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TextInput
          style={{fontSize: 24}}
          editable
          multiline
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={v => updateTitle(v)}
          value={title}
        />
        <TextInput
          style={{paddingBottom: 32}}
          editable
          multiline
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={v => updateContent(v)}
          value={content}
        />
      </ScrollView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#EEEEEE',
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
          <Button onPress={() => {}} title="" />
          <Button onPress={() => Keyboard.dismiss()} title="Done" />
        </View>
      </InputAccessoryView>
    </>
  );
};
