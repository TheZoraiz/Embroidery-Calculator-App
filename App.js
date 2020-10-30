import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
  Keyboard
} from 'react-native';
import Dialog from 'react-native-dialog';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      st: 0,
      rate: 0,
      visible1: false,
      visible2: false,
      custom: 0,
      repeats: 0,
    }

    this.temp = {
      st: 0,
      rate: 0,
    }
  }

  changeState = () => {
    Keyboard.dismiss();
    this.setState({st: this.temp.st, rate: this.temp.rate})
  }

  stChange = (text) => {
    //default state
    if(text.length == 0)
      return;
    

    //if string
    if(isNaN(parseFloat(text)) && text.charAt(text.length - 1) != '.'){
      alert('Invalid input\nPlease enter a number');
      return;
    }

    //if contains alphabets
    if((parseFloat(text).toLocaleString().length != text.length) && text.charAt(text.length - 1) != '.') {
      if(text.charAt(text.length - 1) == 0){
        this.temp = {st: parseFloat(text), rate: this.temp.rate};
        return;
      }

      alert('Invalid input\nPlease enter a number');
      return;
    }

    this.temp = {st: parseFloat(text), rate: this.temp.rate};
  }

  rateChange = (text) => {
    //default state
    if(text.length == 0)
      return;

    //if string
    if(isNaN(parseFloat(text)) && text.charAt(text.length - 1) != '.'){
      alert('Invalid input\nPlease enter a number');
      return;
    }

    //if contains alphabets
    if((parseFloat(text).toLocaleString().length != text.length) && text.charAt(text.length - 1) != '.') {
      if(text.charAt(text.length - 1) == 0){
        this.temp = {rate: parseFloat(text), st: this.temp.st};
        return;
      }

      alert('Invalid input\nPlease enter a number');
      return;
    }

    this.temp = {rate: parseFloat(text), st: this.temp.st};
  }

  render() {
    let st = this.state.st;
    let rate = this.state.rate;

    // let perHead = ( (st * rate) / 1000 ).toLocaleString().length > 16 ? ( (st * rate) / 1000 ).toLocaleString().slice(0, 6) :( (st * rate) / 1000 );
    // let head2 = ( perHead * 2 ).toLocaleString().length > 16 ? ( perHead * 2 ).toLocaleString().slice(0, 6) : ( perHead * 2 );
    // let head3 = (perHead * 3).toLocaleString().length > 16 ? (perHead * 3).toLocaleString().slice(0,5) : ( perHead * 3 )
    // let perMeter = ( (st * rate * 2.77) / 1000 ).toLocaleString().length > 16 ? ( (st * rate * 2.77) / 1000 ).toLocaleString().slice(0, 6) : ( (st * rate * 2.77) / 1000 );
    // let head24 = ( ((st * rate) / 1000) * 24 ).toLocaleString().length > 16 ? ( ((st * rate) / 1000) * 24 ).toLocaleString().slice(0, 6) : ( ((st * rate) / 1000) * 24 );
    // let head28 = ( ((st * rate) / 1000) * 28 ).toLocaleString().length > 16 ? ( ((st * rate) / 1000) * 28 ).toLocaleString().slice(0, 6) : ( ((st * rate) / 1000) * 28 );
    // let meters = ( ((st * rate * 2.77)/1000) * 2.5 ).toLocaleString().length > 16 ? ( ((st * rate * 2.77)/1000) * 2.5 ).toLocaleString().slice(0, 6) : ( ((st * rate * 2.77)/1000) * 2.5 );

    let perHead = Math.round( (st * rate) / 1000 );
    let head2 = Math.round( perHead * 2 );
    let head3 = Math.round (perHead * 3);
    let perMeter = Math.round( (st * rate * 2.77) / 1000 );
    let head24 = Math.round( ((st * rate) / 1000) * 24 );
    let head28 = Math.round( ((st * rate) / 1000) * 28 );
    let meters = Math.round( ((st * rate * 2.77)/1000) * 2.5 );


    return (
      
      <ImageBackground style={styles.container} source={require('./components/back.jpg')} resizeMode='stretch'>


        <Dialog.Container visible={this.state.visible1}>
          <Dialog.Title>Enter Custom Heads</Dialog.Title>
          <Dialog.Input
            style={styles.dialogue}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({ custom: parseInt(text) })}
          ></Dialog.Input>
          <Dialog.Button label="Submit" onPress={() => {
              Alert.alert(
                'Custom Heads:',
                this.state.custom + ' Heads: ' + (perHead * this.state.custom ),
                [
                  { text: 'OK'}
                ],
                { cancelable: false }
              );
              this.setState( { visible1: false } );
            }}/>
        </Dialog.Container>

        <Dialog.Container visible={this.state.visible2}>
          <Dialog.Title>Enter Custom Repeats</Dialog.Title>
          <Dialog.Input
            style={styles.dialogue}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({ repeats: parseInt(text) })}
          ></Dialog.Input>
          <Dialog.Button label="Submit" onPress={() => {
              Alert.alert(
                'Custom Repeats:',
                '24 Heads: ' + ( head24 * this.state.repeats ) + '\n' +
                '28 Heads: ' + ( head28 * this.state.repeats ),
                [
                  { text: 'OK'}
                ],
                { cancelable: false }
              );
              this.setState( { visible2: false } );
            }}/>
        </Dialog.Container>


        <View style={styles.background}>
          <View style={styles.upper}>
            <Text style={styles.smallTitles}>Add Stitches</Text>
            <TextInput
                placeholder='Add Stitches...'
                style={[styles.inputs, {width: screenWidth/1.2}]}
                onChangeText={this.stChange}   
                keyboardType='numeric'
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
            />
            <Text style={styles.smallTitles}>Add Rate</Text>
            <TextInput
                ref={(input) => { this.secondTextInput = input; }}
                placeholder='Add Rate...'
                style={[styles.inputs, {width: screenWidth/1.2}]}
                onChangeText={this.rateChange}    
                onSubmitEditing={this.changeState}
                keyboardType='numeric'
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity delayPressIn={0} style={styles.btt} onPress={() => {
                this.setState({ visible1: true });
              }}>
                <Text style={{color: 'white', fontSize: 16}}>{'Custom\n Heads'}</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={0} style={styles.btt} onPress={() => {
                this.setState({ visible2: true });
              }}>
                <Text style={{color: 'white', fontSize: 16}}>{'Custom\nRepeats'}</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={0} style={styles.btt} onPress={this.changeState}>
                <Text style={{color: 'white', fontSize: 16}}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.line}></View>
          <View style={styles.lower}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 10}}>Readings</Text>
            <View style={styles.innerReadings}>
              <Text style={styles.readings}>Per Head: {perHead}</Text>
              <Text style={styles.readings}>2 Heads: {head2}</Text>
              <Text style={styles.readings}>3 Heads: {head3}</Text>
              <Text style={styles.readings}>Per Yard: {perMeter}</Text>
              <Text style={styles.readings}>24 Head: {head24}</Text>
              <Text style={styles.readings}>28 Head: {head28}</Text>
              <Text style={styles.readings}>2.5 Yard: {meters}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    // height: screenHeight,
  },

  dialogue: {
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    fontSize: 17,
  },
  
  background: {
    backgroundColor: 'white',
    height: screenHeight/1.05,
    width: screenWidth/1.08,
    borderRadius: 30,
    opacity: 0.8,
    elevation: 20,
  },

  smallTitles: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },

  btt: {
    width: 90,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 5,
  },

  readings: {
    fontSize: screenHeight/30,
    marginBottom: 10,
  },
  
  upper: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'flex-start',
    width: screenWidth/1.08,
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'gray',
  },

  lower: {
    flex: 1.7,
    // justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: screenWidth/1.08,
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'gray',
  },

  inputs: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    marginTop: 5,
    marginLeft: ((screenWidth/1.08)/2) - ((screenWidth/1.08 - 31)/2),
  },

  innerReadings: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: screenHeight/2.4,
    width: screenWidth/1.3,
  },

  line: {
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '92%',
    marginLeft: '4%',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
