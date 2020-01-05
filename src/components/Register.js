import React, { Component} from 'react'
import {View, Text,TextInput, Image, TouchableOpacity, Alert, ScrollView, Picker} from 'react-native'
import styles from "../styles/styles";
import RadioButton from './RadioButton';
import Spinner from 'react-native-loading-spinner-overlay';

import Service from '../services/Service';
import Loader from '../services/Loader';

class Register extends Component {
     constructor (props) {
    super (props)
    this.state = {
      email : "",
      username : "",
      id : "",
      whatsappNumber : "",
      name : "",
      password : "",
      confirmPassword : "",
      visible : false, 
      otpField : false,
      mobile : "",
      about : "",
      picker1:"",
      picker2: "",
      otp : "",
      selectedItem : "Student",
      city : "", 
      email : "",
       radioItems:
        [
          {
            label: 'Student',
            size: 30,
            color: '#636c72',
            selected: true
          },

          {
            label: 'Partner',
            color: '#636c72',
            size: 30,
            selected: false,
          },

          
        ]
    }
    service = new Service();
  }
    goToPage = (page) => {
       this.setState({visible : true})
       
      if(this.state.picker1 !=="" && this.state.picker2 !== "")
      {
       console.log('selectedItem', this.state.selectedItem, "picker1", this.state.picker1, "picker2", this.state.picker2)
       service.register(this.state.id, this.state.selectedItem, this.state.email,  this.state.name, this.state.mobile, this.state.whatsappNumber, this.state.picker1, this.state.picker2, this.state.city, this.state.about).then((res) => {
        console.log(res, 'resggggsgs')
        if(res.message == "User Successfully Register") {
          this.setState({visible : false})
          Alert.alert(res.message)
           this.props.navigation.navigate('Thanks')

        }
        else{
                this.setState({visible : false})

          Alert.alert("An Error Occured")
        }
       })
      }
      else{
        alert("please enter valid details")
      }
      // if(this.state.mobile && this.state.password && this.state.username && this.state.confirmPassword && this.state.otp)
      // {
      //    if ( this.state.password != this.state.confirmPassword) {
      //     Alert.alert("password and confirmpassword do not match")
      //   } 
      //   else
      //   {
      //    this.props.navigation.navigate(page)
      //   }
         
      // }

      // else
      // {
      //   if(!this.state.mobile && !this.state.password && !this.state.username && !this.state.confirmPassword && !this.state.otp) {
      //        Alert.alert("please enter all details")
      //   }
      //  else  if(!this.state.mobile )
      //   {
      //       Alert.alert("please enter mobile")
      //   }
      //    else if(!this.state.password )
      //   {
      //       Alert.alert("please enter password")
      //   }
      //   else  if(!this.state.username )
      //   {
      //       Alert.alert("please enter email")
      //   }
      //    else if(!this.state.confirmPassword )
      //   {
      //       Alert.alert("please enter confirm password")
      //   }
       
      // }
        
    }

sendOTP = () => {
  Alert.alert("OTP send Successfully")
}

verifyOTP = () => {
  if(this.state.otp.length == 4) {
    Alert.alert("OTP Verified Successfully")
  }
  else
  {
    Alert.alert("Please enter valid OTP")
  }
}
  setMobile = (text) => 
  {
    if(text.length  == 10)
    {
      this.setState({otpField : true})
    }
    this.setState({ mobile :text})
  }

  changeActiveRadioButton(index) {
    this.state.radioItems.map((item) => {
      item.selected = false;
    });

    this.state.radioItems[index].selected = true;

    this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].label });
    });
  }

  goBack = () => {
      this.props.navigation.goBack()
    }
render () { 
return (<View style={styles.container}>
  <Spinner visible={this.state.visible} color='#8e44ad' tintColor='#8e44ad' animation={'fade'} cancelable={false} textStyle={{ color: '#FFF' }} />
  <View style={styles.toolbar}>
   <TouchableOpacity onPress={() => this.goBack()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>Register</Text>
                    <TouchableOpacity style={styles.toolbarButton}>
                   
                    </TouchableOpacity>
                </View>
      <Image  style={styles.imageWidth} source={require('../images/study.jpg')} ></Image>
      <ScrollView>

    <View style={{marginTop:10}}>
    <View style={{flexDirection : 'row', alignSelf:"center"}}>
    {
          this.state.radioItems.map((item, key) =>
            (
              <RadioButton key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
            ))
        }
    </View>
     <TextInput style={styles.input} placeholder="Reference Id (Optional)" onChangeText={(id)=>this.setState({ id:id})} placeholderTextColor = "#95a5a6"  keyboardType='numeric' maxLength={10}></TextInput>
    <TextInput style={styles.input} placeholder="Name" onChangeText={(text)=>this.setState({ name:text})} placeholderTextColor = "#95a5a6"></TextInput>
     <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=>this.setState({ email:text})} placeholderTextColor = "#95a5a6"></TextInput>
     <TextInput style={styles.input} placeholder="Contact" onChangeText={(text)=>this.setMobile(text) } placeholderTextColor = "#95a5a6"  keyboardType='numeric' maxLength={10}></TextInput>
      <TextInput style={styles.input} placeholder="WhatsApp Number" onChangeText={(text)=>this.setState({ whatsappNumber:text})} placeholderTextColor = "#95a5a6"  keyboardType='numeric' maxLength={10}></TextInput>
       <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.picker1}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({picker1: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="Education" value="education" />  
                    <Picker.Item label="10th" value="10th" />  
                    <Picker.Item label="12th" value="12th" />  
                     <Picker.Item label="Bachelors" value="Bachelors" />  
                    <Picker.Item label="Masters" value="Masters" />  
                     
                   
                </Picker>  
       
               <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.picker2}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({picker2: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="Employment" value="employment" />  
                    <Picker.Item label="Private" value="private" />  
                    <Picker.Item label="Public" value="public" />  

                     
                   
                </Picker>  
    <TextInput style={styles.input} placeholder="City" onChangeText={(text)=>this.setState({ city:text})} placeholderTextColor = "#95a5a6"></TextInput>  
                 <TextInput style={styles.input3} multiline={true} placeholder="A Small Paragraph That Describes You" onChangeText={(about)=> this.setState({ about:about})} placeholderTextColor = "#95a5a6"  keyboardType='default' maxLength={10}></TextInput>
   

    <TouchableOpacity style={styles.buttonBackground} onPress={this.goToPage.bind(this, 'Form')}>
        <Text  style={styles.welcomeLoginText}>SignUp</Text>
        </TouchableOpacity>
        
        </View>
          
        </ScrollView>
        </View>)} 
      
}

const mapStateToProps = state => {


  return {

  };
};

const mapDispatchToProps = {
  
};

export default Register;