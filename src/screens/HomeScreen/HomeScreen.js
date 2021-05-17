import React, {useEffect, useState} from 'react'
import {Text, View , FlatList, ActivityIndicator } from 'react-native'

export default function HomeScreen({ navigation}){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then(json=>setData(json))
            .catch(error=>console.log(error))
            .finally(setIsLoading(false))
    }, [])
    return(
        <View style = {{flex: 1, padding: 24, paddingTop: 48}}>
            <Text style={{ textAlign:'center', fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Api call:</Text>
            {isLoading ? <ActivityIndicator style={{alignItems: 'center', justifyContent:'center'}} />
            : (
                <FlatList 
                    data = {data}
                    keyExtractor = {({id}, index) => id}
                    renderItem = {({item})=>(
                        <Text style={{fontSize: 15}}>
                            <Text style={{fontWeight:'bold'}}>{item.id}</Text>
                            . Name: 
                            <Text style={{fontWeight:'bold'}}>{item.name} </Text>
                            , Companny's name: 
                            <Text style={{fontWeight:'bold'}}>{item.company.name} </Text>
                        </Text>
                    )}
                />
            )
            }
        </View>
    )
}