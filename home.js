import React, { useState, useEffect } from "react";
import { SafeAreaView, Dimensions, View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";
import { db } from "./firebaseConfig";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import styles from "./styles";
import { HabitDescription } from "./habitDesc";

export const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", frequency: "", image: null });
  const userId = "user_id"; // ensure to replace with actual user id
  const { width } = Dimensions.get('window');

  const handleInputChange = (name, value) => {
    setNewHabit({ ...newHabit, [name]: value });
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewHabit({ ...newHabit, image: result.assets[0].uri }); // access the correct uri
    }
  };

  const openHabitDescription = async () => {
    //navigation
  }

  const saveHabit = async () => {
    if (newHabit.name && newHabit.frequency) {
      try {
        const habitRef = doc(collection(db, "users", userId, "habits"));
        await setDoc(habitRef, {
          ...newHabit,
          // ensure image is set to a valid value, use empty string if null
          image: newHabit.image || "",
        });

        // reset habit and close dialog immediately
        setNewHabit({ name: "", frequency: "", image: null });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("error saving habit:", error);
      }
    } else {
      alert("make sure you've filled all the fields!");
    }
  };

  useEffect(() => {
    const fetchHabits = async () => {
      const habitsCollection = collection(db, "users", userId, "habits");

      const unsubscribe = onSnapshot(habitsCollection, (snapshot) => {
        const fetchedHabits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(fetchedHabits);
      });

      return () => unsubscribe();
    };

    fetchHabits();
  }, [userId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#b7b7a4", paddingVertical: 70, width: width }}>
      <Text style={styles.title}>y o u r  h a b i t s</Text>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={<View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
      {item.image ? (
      <Image source={{ uri: item.image }} style={styles.cardContainerImage} />
    ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.cardContainerText}>{item.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={openHabitDescription}>
        <Icon name="arrow-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
        )}        
      />

      {/* add habit button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setIsDialogOpen(true)}>
          <Text style={styles.buttonText}>add a habit/goal</Text>
        </TouchableOpacity>
      </View>

      {/* habit dialog */}
      {isDialogOpen && (
        <View style={[styles.dialogBox, { position: "absolute", top: "0%", height: "120%", width: "100%", backgroundColor: "#b7b7a4", padding: 20 }]}>
          <Text style={styles.title2}>a d d   a   g o a l</Text>
          <View style={styles.addHabitContainer}>

            {/* display image above the button */}
            {newHabit.image && (
              <Image
                source={{ uri: newHabit.image }}
                style={{ marginBottom: 10, width: "100%", height: 150, borderRadius: 10 }}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
                <Text style={styles.buttonText}>upload image</Text>
              </TouchableOpacity>
            </View>

            <Text>name</Text>
            <TextInput
              value={newHabit.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder="what is the name of this habit or goal?"
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Text>frequency</Text>
            <TextInput
              value={newHabit.frequency}
              onChangeText={(text) => handleInputChange("frequency", text)}
              placeholder="e.g., daily, weekly"
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <View style={styles.buttonContainerInline}>
              <TouchableOpacity style={styles.saveButton} onPress={saveHabit}>
                <Text style={styles.buttonText}>save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsDialogOpen(false)}>
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};