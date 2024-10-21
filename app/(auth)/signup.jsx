import { ScrollView, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link,router } from "expo-router";
import { createUser } from "../../lib/appwrite";
const Signup = () => {
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill all the fields')
    }
    setIsSubmitting(true)
    try{
      const result = await createUser(form.email,
        form.password,form.username)

        console.log(result)
        router.replace("signin")
    }catch(error){
      Alert.alert('Error', error.message)
    } finally{
      setIsSubmitting(false)
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full justify-center min-h-[85vh]
        px-4 my-6"
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text
            className="text-2xl text-white text-semibold
          mt-10 font-psemibold"
          >
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })} // corrected spelling
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })} // corrected spelling
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })} // correct prop name
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              Have an account already?
            </Text>
            <Link
              href="/signin"
              className="text-lg font-psemibold text-secondary mt-1"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
