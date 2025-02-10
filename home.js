import React, { useState, useEffect } from "react";
import { SafeAreaView, Dimensions, View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { db } from "./firebaseConfig";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import styles from "./styles";

export const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", frequency: "", image: null });
  const userId = "USER_ID"; // not sure about this...

  const { width } = Dimensions.get('window');

  const handleInputChange = (name, value) => {
    setNewHabit({ ...newHabit, [name]: value });
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaTypes.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewHabit({ ...newHabit, image: result.uri });
    }
  };

  const saveHabit = async () => {
    if (newHabit.name && newHabit.frequency) {
      // save habit to firestore
      const habitRef = doc(collection(db, "users", userId, "habits")); // use user's id to create a subcollection for habits
      await setDoc(habitRef, newHabit);

      setHabits([...habits, newHabit]); // display all saved habits
      setIsDialogOpen(false);
      setNewHabit({ name: "", frequency: "", image: null });
    } else {
      alert("make sure you've filled all the fields!");
    }
  };

  // fetch habits from firestore when the component initiates
  useEffect(() => {
    const fetchHabits = async () => {
      const habitsCollection = collection(db, "users", userId, "habits");
      
      // real-time listener to update ui when the user adds a habit
      const unsubscribe = onSnapshot(habitsCollection, (snapshot) => {
        const fetchedHabits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(fetchedHabits);
      });

      // clean up the subscription on close
      return () => unsubscribe();
    };

    fetchHabits();
  }, [userId]);

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#b7b7a4", paddingVertical: 70, width: width }}>
      <Text style={styles.title}>Y O U R  H A B I T S</Text>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={habits}
        keyExtractor={(item) => item.id} // use the firestore document id as key
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <Card style={styles.cardContainer}>
            {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 150, borderRadius: 10 }} />}
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
            <Text style={{ color: "gray", fontSize: 20 }}>frequency: {item.frequency}</Text>
          </Card>
        )}
      />
      {isDialogOpen && (
        <View style={{ marginTop: 20, paddingHorizontal: 20, paddingVertical: 30, backgroundColor: "white", borderRadius: 20, width: "80%", alignSelf: "center" }}>
          <Text>name</Text>
          <TextInput value={newHabit.name} onChangeText={(text) => handleInputChange("name", text)} placeholder="what is the name of this habit or goal?" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
          <Text>frequency</Text>
          <TextInput value={newHabit.frequency
          } onChangeText={(text) => handleInputChange("frequency", text)} placeholder="e.g., daily, weekly" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
              <Text style={styles.buttonText}>upload image</Text>
            </TouchableOpacity>
          </View>
          {newHabit.image && <Image source={{ uri: newHabit.image }} style={{ marginTop: 10, width: "100%", height: 150, borderRadius: 10 }} />}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={saveHabit}>
              <Text style={styles.buttonText}>save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setIsDialogOpen(false)}>
              <Text style={styles.buttonText}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setIsDialogOpen(true)}>
          <Text style={styles.buttonText}>add a habit/goal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
