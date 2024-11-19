import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/appText/appText';
import colors from '../../assets/colors';

export default function DetailsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Icon */}
      <Icon name="arrow-back" size={24} color={colors.iconColor} style={styles.backIcon} />

      {/* ID Header */}
      <AppText style={styles.headerText}>010003-14052020</AppText>

      {/* Pelanggar Section */}
      <View style={styles.card}>
        <AppText style={styles.sectionTitle}>Pelanggar</AppText>
        <View style={styles.row}>
          <AppText style={styles.label}>Nama Pelanggar</AppText>
          <AppText style={styles.value}>Ageng Kurniawan</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Jenis/Nomor ID</AppText>
          <AppText style={styles.value}>KTP/3275011402960017</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>No. Handphone</AppText>
          <AppText style={styles.value}>0821 1197 2020</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Email</AppText>
          <AppText style={styles.value}>ageng.kurnia@gmail.com</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Barang Sitaan</AppText>
          <AppText style={styles.value}>SIM C</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Pelanggaran Pasal</AppText>
          <AppText style={styles.value}>Pasal 285 Ayat 1</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}></AppText>
          <AppText style={styles.value}>Pasal 288 Ayat 1</AppText>
        </View>
      </View>

      {/* Pembayaran Section */}
      <View style={styles.card}>
        <AppText style={styles.sectionTitle}>Pembayaran</AppText>
        <View style={styles.row}>
          <AppText style={styles.label}>Denda Maksimal</AppText>
          <AppText style={styles.value}>Rp. 750.000</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Bank Pembayaran</AppText>
          <AppText style={styles.value}>Bank Permata</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>No. Virtual Account</AppText>
          <AppText style={styles.value}>9022839483023</AppText>
        </View>
      </View>

      {/* Status Section */}
      <View style={styles.card}>
        <AppText style={styles.sectionTitle}>Status</AppText>
        <View style={styles.row}>
          <AppText style={styles.label}>Status</AppText>
          <AppText style={styles.value}>Menunggu</AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerText: {
    color: colors.primaryText,
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    color: colors.lightGray,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    color: colors.white,
  },
  value: {
    color: colors.white,
  },
});
