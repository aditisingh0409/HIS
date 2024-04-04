import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';

export default function ProfileStatistics() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image 
            source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp' }}
            size={100}
            style={styles.avatar}
          />
          <Text style={styles.name}>Julie L. Arsenault</Text>
          <Text style={styles.subtitle}>@Programmer | mdbootstrap.com</Text>
          <View style={styles.socialButtons}>
            <Button icon="facebook" mode="outlined" style={styles.socialButton} />
            <Button icon="twitter" mode="outlined" style={styles.socialButton} />
            <Button icon="skype" mode="outlined" style={styles.socialButton} />
          </View>
          <Button mode="contained" style={styles.messageButton}>
            Message now
          </Button>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8471</Text>
              <Text style={styles.statLabel}>Wallets Balance</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8512</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4751</Text>
              <Text style={styles.statLabel}>Total Transactions</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 15,
    margin: 20,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'grey',
  },
  socialButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialButton: {
    marginRight: 10,
  },
  messageButton: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'grey',
  },
});