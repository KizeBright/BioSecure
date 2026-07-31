import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const summaryCards = [
  { label: 'Healthy animals', value: '12,482', icon: 'fitness-outline', tint: '#4CAF50' },
  { label: 'Disease alerts', value: '3', icon: 'alert-circle-outline', tint: '#F59E0B' },
  { label: 'Vaccinations due', value: '5', icon: 'medkit-outline', tint: '#3B82F6' },
];

const alerts = [
  { title: 'ASF movement restriction', detail: 'Anuradhapura district – immediate action required', priority: 'Critical' },
  { title: 'HPAI surveillance zone', detail: 'Ampara farms need stricter biosecurity', priority: 'High' },
  { title: 'Newcastle vaccination due', detail: 'Broiler houses to receive booster this week', priority: 'Medium' },
];

const scheduleItems = [
  { label: 'Farm inspection', time: '08:30' },
  { label: 'Vet review', time: '11:00' },
  { label: 'Vaccination round', time: '14:00' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>BioSecure Mobile</Text>
            <Text style={styles.title}>Livestock health command center</Text>
          </View>
          <Pressable style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Today’s status</Text>
          <Text style={styles.heroText}>Biosecurity score is strong, but three critical alerts need attention.</Text>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Open incident view</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {summaryCards.map((card) => (
            <View key={card.label} style={styles.card}>
              <View style={[styles.iconBadge, { backgroundColor: `${card.tint}15` }] }>
                <Ionicons name={card.icon} size={18} color={card.tint} />
              </View>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardLabel}>{card.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Immediate alerts</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>

        {alerts.map((item) => (
          <View key={item.title} style={styles.alertItem}>
            <View style={styles.alertRow}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
            </View>
            <Text style={styles.alertDetail}>{item.detail}</Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <Text style={styles.sectionLink}>Today</Text>
        </View>

        {scheduleItems.map((item) => (
          <View key={item.label} style={styles.scheduleItem}>
            <View>
              <Text style={styles.scheduleLabel}>{item.label}</Text>
              <Text style={styles.scheduleSubtext}>Assigned to farm team</Text>
            </View>
            <Text style={styles.scheduleTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7EF',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#6B7280',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  heroCard: {
    backgroundColor: '#1F3A2F',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroText: {
    color: '#DDE9D5',
    fontSize: 14,
    marginBottom: 16,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8C860',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#1F2937',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  sectionLink: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  alertItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  priorityText: {
    color: '#C2410C',
    fontSize: 11,
    fontWeight: '700',
  },
  alertDetail: {
    fontSize: 12,
    color: '#6B7280',
  },
  scheduleItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  scheduleSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  scheduleTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4CAF50',
  },
});
