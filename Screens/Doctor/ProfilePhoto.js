import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';

export default function ProfileStatistics( {Toggle}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    Toggle();
  };

        
      //Update password
      // try{
      //   const response = await axios.post('https://present-neat-mako.ngrok-free.app/his/changePassword', {
      //     userId: "saloni-admin",
      //     oldPassword: "12345",
      //     "newPassword": "1234",
      //     role: role
      // }, {
      //   headers: {
      //     "userId":"saloni-admin",
      //     "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxvbmkiLCJyb2xlIjpbImFkbWluIl0sImlhdCI6MTcxMjg0MDUwNywiZXhwIjoxNzEyOTI2OTA3fQ.LmX-nrj1Udzhh-fx62mXZoiY-qRvfMc8oufzlHokiCM"
      //   }
      // });
      // console.log("API response: "+JSON.stringify(response.data));
      // }catch(err){
      //   console.error(`Error! ${JSON.stringify(err.response)}`);
      // }
  
//   return (
//     <View style={styles.container}>
//     {isOpen && (  
//       <TouchableOpacity onPress={handleToggle}>
//         <View>
//           <Image
//               source={require('./img2.jpg')}
//               style={styles.profileImage}
//             />
//         </View>
//       </TouchableOpacity>
//     )}
//       <Card style={styles.card}>
//         <Card.Content style={styles.cardContent}>
//           <Avatar.Image 
//             source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp' }}
//             size={100}
//             style={styles.avatar}
//           />
//           <Text style={styles.name}>Julie L. Arsenault</Text>
//           <Text style={styles.subtitle}>@Programmer | mdbootstrap.com</Text>
//           <View style={styles.socialButtons}>
//             <Button icon="facebook" mode="outlined" style={styles.socialButton} />
//             <Button icon="twitter" mode="outlined" style={styles.socialButton} />
//             <Button icon="skype" mode="outlined" style={styles.socialButton} />
//           </View>
//           <Button mode="contained" style={styles.messageButton}>
//             Message now
//           </Button>
//           <View style={styles.statsContainer}>
//             <View style={styles.stat}>
//               <Text style={styles.statValue}>8471</Text>
//               <Text style={styles.statLabel}>Wallets Balance</Text>
//             </View>
//             <View style={styles.stat}>
//               <Text style={styles.statValue}>8512</Text>
//               <Text style={styles.statLabel}>Followers</Text>
//             </View>
//             <View style={styles.stat}>
//               <Text style={styles.statValue}>4751</Text>
//               <Text style={styles.statLabel}>Total Transactions</Text>
//             </View>
//           </View>
//         </Card.Content>
//       </Card>
//     </View>
//   );
// }

return (
  <View style={styles.container}>
    {isOpen && (  
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
    )}

    <TouchableOpacity onPress={handleToggle}>
      <View>
        <Image
          source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp' }}
          style={styles.profileImage}
        />
      </View>
    </TouchableOpacity>
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