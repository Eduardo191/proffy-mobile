import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native'
import styles from './styles'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisisble] = useState(false)

  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers() {
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return(
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={() => setIsFiltersVisisble(!isFiltersVisible)}>
            <Feather name="filter" size={20} color="#FFF"/>
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <Picker 
              style={styles.input}
              selectedValue={subject}
              onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
            >
              <Picker.Item label="Artes" value="Artes" />
              <Picker.Item label="Biologia" value="Biologia" />
              <Picker.Item label="Matemática" value="Matemática" />
              <Picker.Item label="Ciências" value="Ciências" />
              <Picker.Item label="Física" value="Física" />
              <Picker.Item label="Química" value="Química" />
              <Picker.Item label="Português" value="Português" />
              <Picker.Item label="História" value="História" />
              <Picker.Item label="Geografia" value="Geografia" />
            </Picker>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <Picker
                  style={styles.input}
                  selectedValue={week_day}
                  onValueChange={(itemValue, itemIndex) => setWeekDay(itemValue)}
                >
                  <Picker.Item label="Domingo" value="0" />
                  <Picker.Item label="Segunda-feira" value="1" />
                  <Picker.Item label="Terça-feira" value="2" />
                  <Picker.Item label="Quarta-feira" value="3" />
                  <Picker.Item label="Quinta-feira" value="4" />
                  <Picker.Item label="Sexta-feira" value="5" />
                  <Picker.Item label="Sábado" value="6" />
                </Picker>  
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bcc"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  style={styles.input}
                  placeholder="Qual o horário?" 
                />  
              </View>
            </View>

            <RectButton onPress={searchTeachers} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher}/>)}
      </ScrollView>
    </View>
  )
}

export default TeacherList