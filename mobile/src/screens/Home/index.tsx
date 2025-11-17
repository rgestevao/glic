import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import NavBar from '../../components/NavBar'
import { Colors } from '../../styles/colors'

export default function Home() {
	const token = AsyncStorage.getItem('token')
	console.log('Token no Home:', token)

	const measures = [
		{
			id: '1',
			value: 120,
			unit: 'mg/dL',
			time: '05:00',
			date: '31/10/2025',
			status: 'Normal',
		},
		{
			id: '2',
			value: 98,
			unit: 'mg/dL',
			time: '08:30',
			date: '31/10/2025',
			status: 'Normal',
		},
		{
			id: '3',
			value: 150,
			unit: 'mg/dL',
			time: '12:20',
			date: '31/10/2025',
			status: 'High',
		},
		{
			id: '4',
			value: 85,
			unit: 'mg/dL',
			time: '15:45',
			date: '31/10/2025',
			status: 'Low',
		},
		{
			id: '5',
			value: 110,
			unit: 'mg/dL',
			time: '19:10',
			date: '31/10/2025',
			status: 'Normal',
		},
	]
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Medidas de Hoje</Text>

			<FlatList
				data={measures}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 96 }}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<View style={styles.headerCard}>
							<View style={styles.measureRow}>
								<Text style={styles.measureValue}>{item.value} </Text>
								<Text>{item.unit}</Text>
							</View>
							<Pressable onPress={() => {}}>
								<Feather name={'trash-2'} size={24} color={Colors.Grey300} />
							</Pressable>
						</View>
						<View style={styles.bottomCard}>
							<View style={styles.dateTimeContainer}>
								<View style={styles.dateTimeText}>
									<Feather
										name={'clock'}
										size={16}
										color={Colors.Grey300}
										style={styles.dateIcon}
									/>
									<Text style={styles.dateText}>{item.time}</Text>
								</View>
								<View style={styles.dateTimeText}>
									<Feather
										name={'calendar'}
										size={16}
										color={Colors.Grey300}
										style={styles.dateIcon}
									/>
									<Text style={styles.dateText}>{item.date}</Text>
								</View>
							</View>
							<View
								style={
									item.status === 'Normal'
										? styles.normalStatusContainer
										: item.status === 'Low'
										? styles.lowStatusContainer
										: styles.highStatusContainer
								}
							>
								<Text
									style={
										item.status === 'Normal'
											? styles.normalStatusText
											: item.status === 'Low'
											? styles.lowStatusText
											: styles.highStatusText
									}
								>
									{item.status}
								</Text>
							</View>
						</View>
					</View>
				)}
			/>
			<View>
				<NavBar />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White100,
		padding: 24,
		gap: 16,
	},

	title: {
		color: Colors.Black900,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
		marginTop: 32,
	},

	icon: {
		position: 'absolute',
		right: 16,
		top: 18,
	},

	card: {
		backgroundColor: Colors.White200,
		borderRadius: 8,
		padding: 16,
		width: 342,
		marginBottom: 12,
		height: 180,
	},

	measureRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},

	measureValue: {
		color: Colors.Black900,
		fontSize: 48,
		fontFamily: 'Sora_800ExtraBold',
	},

	headerCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	dateTimeContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginTop: 16,
	},

	dateTimeText: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 4,
	},

	dateIcon: {
		marginRight: 8,
	},

	dateText: {
		color: Colors.Grey300,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	bottomCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 16,
	},

	normalStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Green100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	normalStatusText: {
		color: Colors.Green900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},

	lowStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Blue100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	lowStatusText: {
		color: Colors.Blue900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},

	highStatusContainer: {
		marginTop: 8,
		backgroundColor: Colors.Red100,
		padding: 4,
		borderRadius: 36,
		width: 120,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
	},

	highStatusText: {
		color: Colors.Red900,
		fontSize: 18,
		fontFamily: 'Sora_400Regular',
	},
})
