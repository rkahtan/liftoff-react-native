import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 20,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#223023',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '4%',
    borderRadius: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 200,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    // backgroundColor: '#899C89',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseButton: {
    width: 500,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#223023',
    borderRadius: 15,
    alignSelf: 'center',
  },
  formInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    margin: 5,
  },
  info: {
    alignItems: 'center',
    
  },
  nav: {
    // position: 'absolute',
    // top: 70,
  },
  scroll: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: '#899C89',
    padding: 10,
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
  titleText: {
    // textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#899C89',
    top: 15,
    padding: 20,
    textAlign: 'center',
  },
});