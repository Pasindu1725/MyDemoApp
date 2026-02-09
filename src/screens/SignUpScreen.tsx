import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen: React.FC<any> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  // Fetch country list
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(res => res.json())
      .then(data => {
        const list = data
          .map((item: any) => item.name.common)
          .sort();
        setCountries(list);
      })
      .catch(() => setCountries([]));
  }, []);

  const validatePassword = (pwd: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+]).{8,30}$/;
    return regex.test(pwd);
  };

  const handleSignUp = () => {
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !mobile ||
      !email ||
      !country ||
      !password ||
      !confirmPassword
    ) {
      setError('All fields are mandatory');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be 8–30 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agree) {
      setError('You must agree to Terms & Conditions');
      return;
    }

    setError('');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Gender */}
      <View style={styles.genderRow}>
        <TouchableOpacity onPress={() => setGender('Male')}>
          <Text style={gender === 'Male' ? styles.selected : styles.gender}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Female')}>
          <Text
            style={gender === 'Female' ? styles.selected : styles.gender}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Mobile No"
        style={styles.input}
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Country Dropdown */}
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={country} onValueChange={setCountry}>
          <Picker.Item label="Select Country" value="" />
          {countries.map(c => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Terms */}
      <TouchableOpacity onPress={() => setAgree(!agree)}>
        <Text style={styles.checkbox}>
          {agree ? '☑' : '☐'} Agree with Terms & Conditions
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#105661',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  gender: {
    color: '#000000',
  },
  selected: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 10,
  },
  checkbox: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  back: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
