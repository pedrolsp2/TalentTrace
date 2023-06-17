import React from 'react';
import {View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text} from 'react-native';

export function Publications({data}) {
    console.log("veioaaaaaaaaaaa",data)
    return (
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    );
} 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#1A0751',
        alignItems: 'center',
        height: 400,
        borderRadius: 12,
    }
})