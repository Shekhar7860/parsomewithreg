import React, { Component} from 'react'
import {View, Text, Image,TextInput, Alert, TouchableOpacity, ImageBackground} from 'react-native'
import styles from "../styles/styles";
import Service from "../services/Service";
// import { LoginManager,   AccessToken } from 'react-native-fbsdk';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authaction from '../actions/authaction'
//import { logindata } from '../actions/authaction';
 class Login extends Component {

     constructor (props) {
    super (props)
    this.state = {
      mobile : "",
      password : "",
      email : "",
      loading: false,
       visible : false
    }
    service = new Service()
  }

signUp = () => {
 // alert(JSON.stringify(this.props))
  this.props.navigation.navigate('Register')
}
  componentDidMount = () => {
    // GoogleSignin.configure({
    //   scopes: ['openid', 'email', 'profile'],
    //   shouldFetchBasicProfile: true,// what API you want to access on behalf of the user, default is email and profile
    //   webClientId: '1012229639116-h85hqugmo9iaunhk5o1pla9t7p5b5lcn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   hostedDomain: '', // specifies a hosted domain restriction
    //   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    //   accountName: '', // [Android] specifies an account name on the device that should be used
    //   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // });
    this.setState({loading : true})
    setTimeout (() => this.setState({loading : false }), 2000)
  }
    goToPage = (page) => {
      if(this.state.mobile && this.state.password)
      {
        // if (!service.validateEmail(this.state.email)) {
        //   Alert.alert("please enter valid email")
        // } 
        // else
        // {
         this.props.navigation.navigate(page)
      //  }
      }
      else
      {
        if(!this.state.mobile  && !this.state.password ) {
             Alert.alert("please enter mobile & password both")
        }
       else  if(!this.state.mobile )
        {
            Alert.alert("please enter mobile")
        }
         else if(!this.state.password )
        {
            Alert.alert("please enter password")
        }
      }
       
    }


   

    login = () => 
    {
   
      
       if ( service.validateEmail(this.state.email)) {
         this.setState({visible : true})
          service.login(this.state.email, this.state.password).then((res) => {
            console.log(res, 'resssss')
            if(res.success == "true") {
          this.setState({visible : false})
          service.saveUserData('user', res.result)
          this.props.navigation.navigate('Home2')
          // this.props.actions.logindata(res)
          // this.props.navigation.navigate('Home2')

        }
        else{
           Alert.alert("Wrong Email Or Password")
           this.setState({visible : false})
        }
                      })
       }
        else{
          alert("please enter valid email")
        }
      
    }

    getUserProfile = (token) =>{ 
      fetch('https://graph.facebook.com/v2.9/me?fields=picture.width(720).height(720).as(picture_large),name,email,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, 'shjshhshs')
        // service.saveUserData('user', json);
         this.props.navigation.navigate('Home2')
      })
      .catch((err) => {
      //  alert(JSON.stringify(err))
      })
     
  }

  goBack = () => {
      this.props.navigation.goBack()
    }
render () { 
return (
 
       
        <View style={styles.container}>
  <Spinner visible={this.state.visible} color='#8e44ad' tintColor='#8e44ad' animation={'fade'} cancelable={false} textStyle={{ color: '#FFF' }} />
   
   <View style={{marginTop:30}}>
    <Image  style={styles.imageWidth} source={require('../images/ic_launcher.png')} ></Image>
     <View style={{marginTop:20}}>
    <TextInput value={this.state.email} onChangeText={(text)=>this.setState({ email:text})} style={styles.input} placeholder="Email"  placeholderTextColor = "black" keyboardType='default' ></TextInput>
    <TextInput value={this.state.password} style={styles.input} onChangeText={(text)=>this.setState({ password:text})} placeholder="Password"  placeholderTextColor = "black" secureTextEntry={true}></TextInput>
     <TouchableOpacity style={styles.buttonBackground} onPress={this.login.bind(this)}>
        <Text  style={styles.welcomeLoginText}>Login</Text>
        </TouchableOpacity>
          <Text style={styles.guestText} onPress={this.signUp.bind(this, 'Home2')}>Forgot Password? </Text>

           <TouchableOpacity style={styles.buttonBackground2} onPress={this.signUp.bind(this, 'Register')}>
        <Text  style={styles.welcomeLoginText}>Register</Text>
        </TouchableOpacity>

        </View>
          </View>
      
        
        </View>
       )} 
      
}

function mapStateToProps(state, ownProps) {
    return {
        user: state
    };
  }

 function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authaction, dispatch)
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(Login);