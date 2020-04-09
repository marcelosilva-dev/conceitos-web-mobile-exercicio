import React, {useEffect , useState } from "react";
import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories , setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data)
    })
  }, [])

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const repoIndex = repositories.findIndex(repo => repo.id === id)
  
    repositories[repoIndex].likes = repositories[repoIndex].likes + 1
    setRepositories([...repositories])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
        {repositories.map(repo => 
         <View key={repo.id} style={styles.repositoryContainer}>
         <Text style={styles.repository}>{repo.title}</Text>

         {repo.techs.map(repo => 
                   <View style={styles.techsContainer}>
                   <Text style={styles.tech}>
                     {repo}
                   </Text>
                 </View>
          )}


         <View style={styles.likesContainer}>
           <Text
             style={styles.likeText}
             // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
             testID={`repository-likes-${repo.id}`}
           >
             {repo.likes %  repo.likes === 0 ? `${repo.likes} curtidas` :`${repo.likes} curtida`}
           </Text>
         </View>

         <TouchableOpacity
           style={styles.button}
           onPress={() => handleLikeRepository(repo.id)}
           // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
           testID={`like-button-${repo.id}`}
         >
           <Text style={styles.buttonText}>Curtir</Text>
         </TouchableOpacity>
       </View>  
          )}
       </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
