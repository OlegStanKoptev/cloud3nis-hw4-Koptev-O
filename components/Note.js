import React, {useEffect, useRef, useState} from 'react';
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
import {updateNote} from '../modules/notes/actions';

let alertDismissed = false;

export const Note = ({route}) => {
  const noteId = route.params.noteId;
  const note = useSelector(
    state => state.notes.find(e => e.id === noteId) ?? null,
  );
  const dispatch = useDispatch();

  const showAlert = () =>
    Alert.alert(
      'Alert',
      'If you type too fast, several fetch requests overlap ' +
        'and some of them do not go through.\nCan be solved by not spamming ' +
        'the update request on every text change',
      [{text: 'OK', onPress: () => (alertDismissed = true)}],
    );

  const onChange = ({title, content, image}) => {
    let object = {
      id: noteId,
    };
    if (title) {
      if (!title.trim()) {
        return;
      }
      console.log('include title');
      object = {
        ...object,
        title: title,
      };
    }
    if (content) {
      console.log('include content');
      object = {
        ...object,
        content: content,
      };
    }
    if (image) {
      console.log('include image');
      object = {
        ...object,
        image: image,
      };
    }
    dispatch(updateNote(object));

    // let noteIndex = myContext.notes.findIndex(e => e.id === note.id);
    // let oldTitle = myContext.notes[noteIndex].title;
    // let oldContent = myContext.notes[noteIndex].content;
    // myContext.notes[noteIndex].title = title;
    // myContext.notes[noteIndex].content = content;
    // myContext.notes[noteIndex].image = image;
    // myContext.setNotes(myContext.notes);
    // if (oldTitle !== title || oldContent !== content) {
    //   myContext.updateList();
    // }
  };

  const inputAccessoryViewID = 'uniqueID';
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    if (!alertDismissed) {
      showAlert();
    }
    return () => keyboardWillShowListener.remove();
  });

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [image, setImage] = useState(note.image);
  const updateTitle = value => {
    setTitle(value);
    onChange({title: value});
  };
  const updateContent = value => {
    setContent(value);
    onChange({content: value});
  };
  const updateImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxHeight: 600, maxWidth: 400, includeBase64: true},
      response => {
        if (response.assets !== undefined && response.assets.length === 1) {
          let importedImg =
            'data:image/png;base64,' + response.assets[0].base64;
          setImage(importedImg);
          onChange({image: importedImg});
        }
      },
    );
  };
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
