import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors';

export default function FilterScreen() {
  // Define states for each toggle switch
  const [slipBiru, setSlipBiru] = useState(false);
  const [slipMerah, setSlipMerah] = useState(false);
  const [menunggu, setMenunggu] = useState(false);
  const [sudahBayar, setSudahBayar] = useState(false);
  const [akanSidang, setAkanSidang] = useState(false);
  const [sudahSidang, setSudahSidang] = useState(false);

  // Function to change colors based on switch state
  const getSwitchColor = (value) => (value ? '#6A7FDB' : '#FFC0CB');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Icon */}
      <Icon name="close" size={24} color="#333" style={styles.closeIcon} />

      {/* Header */}
      <Text style={styles.headerText}>Filter</Text>

      {/* Jenis Tindak Pelanggaran Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Types Of Violation</Text>
        <View style={styles.row}>
          <Icon name="document-text" size={24} color="#8E8E8E" />
          <Text style={styles.label}>OverSpeeding</Text>
          <Switch
            value={slipBiru}
            onValueChange={(value) => setSlipBiru(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(slipBiru) }}
            thumbColor={slipBiru ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.row}>
          <Icon name="document-text" size={24} color="#8E8E8E" />
          <Text style={styles.label}>Drink and Drive</Text>
          <Switch
            value={slipMerah}
            onValueChange={(value) => setSlipMerah(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(slipMerah) }}
            thumbColor={slipMerah ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.row}>
          <Icon name="document-text" size={24} color="#8E8E8E" />
          <Text style={styles.label}>Flat Tyre</Text>
          <Switch
            value={slipMerah}
            onValueChange={(value) => setSlipMerah(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(slipMerah) }}
            thumbColor={slipMerah ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      {/* Status Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.row}>
          <Icon name="time" size={24} color="#8E8E8E" />
          <Text style={styles.label}>Pending</Text>
          <Switch
            value={menunggu}
            onValueChange={(value) => setMenunggu(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(menunggu) }}
            thumbColor={menunggu ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.row}>
          <Icon name="checkmark-done" size={24} color="#8E8E8E" />
          <Text style={styles.label}>Paid</Text>
          <Switch
            value={sudahBayar}
            onValueChange={(value) => setSudahBayar(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(sudahBayar) }}
            thumbColor={sudahBayar ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.row}>
          <Icon name="megaphone" size={24} color="#8E8E8E" />
          <Text style={styles.label}>OverDue</Text>
          <Switch
            value={akanSidang}
            onValueChange={(value) => setAkanSidang(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(akanSidang) }}
            thumbColor={akanSidang ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.row}>
          <Icon name="hammer" size={24} color="#8E8E8E" />
          <Text style={styles.label}>Escaped</Text>
          <Switch
            value={sudahSidang}
            onValueChange={(value) => setSudahSidang(value)}
            trackColor={{ false: '#d3d3d3', true: getSwitchColor(sudahSidang) }}
            thumbColor={sudahSidang ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  closeIcon: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.deepBlue,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.darkBlue,
    flex: 1,
    marginLeft: 10,
  },
});
