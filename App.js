import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, ImageBackground, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useState,useEffect } from 'react';


export default function App() {
  //---függvények state-ek helye
  const[vicc,setVicc] = useState("")
  const [adatok,setAdatok]=useState([])
  const [szoveg,setSzoveg]=useState("")

  const tomb=[
    {
      "szoveg":"– Egy almát kérek - Kettő lett. Maradhat?",
      "tipus":"favicc"
    },
    {
      "szoveg":"- Mit mond a szőke nő ha nekimegy autóval a fának? - Pedig én dudáltam!",
      "tipus":"szőkenős vicc"
    },
    {
      "szoveg":"- Mit mond a rasszista taxis, ha meglát a zebrán egy kínait?- Na, ezen a sárgán még átmegyek!",
      "tipus":"morbid vicc"
    },
    {
      "szoveg":"- Tegnap búvárpizzát ettem! - Az meg mi? - Lement, körülnézett, aztán feljött.",
      "tipus":"morbid vicc"
    },
    {
      "szoveg":"- A nők olyanok, mint a pizza. A húsos jobb, mint a gombás.",
      "tipus":"morbid vicc"
    }
    
  ]

  const sorsol=()=>{
    let veletlenSzam=Math.floor(Math.random()*tomb.length)
    
    setVicc(tomb[veletlenSzam].szoveg)
  }

  const letoltes=async ()=>{
    let x= await fetch("https://api.chucknorris.io/jokes/random")
    let y= await x.json()
    setAdatok(y)
  }
  function gombNyomas(){
    Alert.alert("üdvözlet", "Hello " + szoveg)
  }

useEffect(()=>{
  sorsol()
  letoltes()
},[])

  return (
    <ImageBackground source={require("./assets/cica.jpg")} style={styles.hatterKep}>
    <View style={[ styles.container,{flexDirection: 'column',   },  ]}>
      <View style={{flex: 1, paddingTop:80}} >
         
          <TouchableOpacity style={styles.button} onPress={()=>sorsol()}>
              <Text>Új vicc</Text>
          </TouchableOpacity>
          <Text style={styles.kek}>{vicc}</Text>
        </View>
      <View style={{flex: 1,paddingTop:80}}> 
          
          
          <Pressable style={styles.button} onPress={()=>letoltes()}>
              <Text>Új Chuck norris vicc</Text>
          </Pressable>
          <Text style={styles.kek}>{adatok.value}</Text>

          <TextInput
              style={styles.input}
              onChangeText={setSzoveg}
              placeholder='Neved'
              value={szoveg}
          />
          <TouchableOpacity style={styles.button} onPress={gombNyomas}>
              <Text>Üdvözlet</Text>
          </TouchableOpacity>
          
        </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  kek:{
    color:"black",
    fontSize:20,
    fontWeight:"bold",
    backgroundColor:"white"
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"white"
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  hatterKep:{
    resizeMode:"cover",
    justifyContent:"center",
    flex:1
  }
});
