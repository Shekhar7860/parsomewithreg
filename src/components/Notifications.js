import React, {Component} from 'react';
import {Platform, Text, View, TextInput, Image, ImageBackground, TouchableOpacity, StatusBar, ScrollView, TouchableNativeFeedback} from 'react-native';
import styles from "../styles/styles";
import Service from "../services/Service";
import Spinner from 'react-native-loading-spinner-overlay';
export default class Notifications extends Component {

  constructor(props){
    super(props);
    this.state = { 
      name:'',
      email:'',
      mobile:'',
      country:'',
      prefcountry : '',
      prefcollege : "",
      prefprogram : "",
      ielts : "",
      intake : "",
      pr : false,
      confirmPasswordError:'',
      passwordError:'',
      emailFormatError:'',
      mobileError:'',
      emailFormatError:'',
      loading: false,
      cardheight:300
    }
     service = new Service()

  }

    openMenu = () => {
    this.props.navigation.openDrawer()
  }

  componentDidMount = () => {
    service.getUserData('user').then((keyValue) => {
    // alert(JSON.stringify(keyValue))
     this.setState({userId : keyValue.userId})
   }, (error) => {
      console.log(error) //Display error
    });

  }

   submit = () => {
       if (this.state.name && this.state.email && this.state.mobile )
       {
        // this.setState({visible : true})
            service.saveLead(this.state.userId, this.state.name, this.state.email, this.state.mobile, this.state.country, this.state.prefcountry, this.state.prefcollege, this.state.prefprogram, this.state.ielts, this.state.intake).then((res) => {
              alert(JSON.stringify(res))
        //     if(res.success == true) {
        //   this.setState({visible : false})
        //   Alert.alert(res.message)
        // }


        
      })
           // this.props.navigation.navigate('Profile')
       }
       else
       {
           alert("please enter all details both")
       }
   }

  signUp = () =>{
    this.setState(() => ({ cardheight:370}));
    if ( !service.validateEmail(this.state.email)) {
      this.setState(() => ({ emailFormatError: "Proper Email Format is Required"}));
    } 
    else{
      this.setState(() => ({ emailFormatError: ''}));
    }
    if (this.state.email.trim() === "") {
      this.setState(() => ({ emailError: " Email is required."}));
      this.setState(() => ({ emailFormatError: null}));
    } else {
      this.setState(() => ({ emailError: null})); 
    }
    if (this.state.password.trim() === "") {
      this.setState(() => ({ passwordError: " Password is required."}));
    } else {
      this.setState(() => ({ passwordError: null}));
    }
    if (this.state.mobile.trim() === "") {
      this.setState(() => ({ mobileError: " Mobile Number is required."}));
    } else {
      this.setState(() => ({ mobileError: null}));
    }
    if (this.state.confirmPassword.trim() === "") {
      this.setState(() => ({ confirmPasswordError: " Confirm Password is required."}));
    } else {
      this.setState(() => ({ confirmPasswordError: null}));
    }
    if(this.state.email && this.state.mobile && this.state.password && this.state.confirmPassword)
    {
      this.setState(() => ({ cardheight:300}));
    }

    if(this.state.email && this.state.password && this.state.mobile && this.state.confirmPassword && service.validateEmail(this.state.email))
    {
      
     this.setState ({ loading: true});
      setTimeout(() => 
      {this.setState({loading: false})
      this.refs.defaultToastBottom.ShowToastFunction('SignUp SuccessFully');
      this.props.navigation.navigate('Login')
       }, 3000)
      }

  
   // alert(this.state.password)
   }

     setMobile = (text) => 
  {
    if(text.length  == 10)
    {
      this.setState({otpField : true})
    }
    this.setState({ mobile :text})
  }
   goBack = () =>{
    this.props.navigation.pop()
   }
   
  render() {
      const  NewImage =   <Image source={require('../images/78.png')} style={styles.profilePic}/>
    return (
    
      <View style={{flex:1}}>
       <Spinner visible={this.state.visible} color='#8e44ad' tintColor='#8e44ad' animation={'fade'} cancelable={false} textStyle={{ color: '#FFF' }} />
         <View style={styles.toolbar}>
         <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>Create Leads</Text>
                    <TouchableOpacity>
                    <Image style={{width:30,marginRight:10,  height:30}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:20, flex:1, marginBottom :20}}>
                <ScrollView>
                <TextInput style={styles.input} placeholder="Name" onChangeText={(text)=>this.setState({ name:text})} placeholderTextColor = "#95a5a6"></TextInput>
          <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=>this.setState({ email:text})} placeholderTextColor = "#95a5a6"></TextInput>
            <TextInput style={styles.input} placeholder="Contact" onChangeText={(text)=>this.setMobile(text) } placeholderTextColor = "#95a5a6"  keyboardType='numeric' maxLength={10}></TextInput>
           <TextInput style={styles.input} placeholder="City" onChangeText={(text)=>this.setState({ city:text})} placeholderTextColor = "#95a5a6"></TextInput>
                  <TextInput style={styles.input} placeholder="Country" onChangeText={(text)=>this.setState({ country:text})} placeholderTextColor = "#95a5a6"></TextInput>
                 <TextInput style={styles.input} placeholder="Preffered Country" onChangeText={(text)=>this.setState({ prefcountry:text})} placeholderTextColor = "#95a5a6"></TextInput>
                      <TextInput style={styles.input} placeholder="Preferred College" onChangeText={(text)=>this.setState({ prefcollege:text})} placeholderTextColor = "#95a5a6"></TextInput>
                                <TextInput style={styles.input} placeholder="Preffered Program" onChangeText={(text)=>this.setState({ prefprogram:text})} placeholderTextColor = "#95a5a6"></TextInput>
                                                                <TextInput style={styles.input} placeholder="IELTS" onChangeText={(text)=>this.setState({ ielts:text})} placeholderTextColor = "#95a5a6"></TextInput>
                                              <TextInput style={styles.input} placeholder="INTAKE" onChangeText={(text)=>this.setState({ intake:text})} placeholderTextColor = "#95a5a6"></TextInput>
                                              <TouchableOpacity style={styles.buttonBackground} onPress={this.submit.bind(this, 'Form')}>
        <Text  style={styles.welcomeLoginText}>SUBMIT</Text>
        </TouchableOpacity>
               </ScrollView>
               </View>
              
      </View>
      
    );
}


}