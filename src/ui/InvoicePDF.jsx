/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    heading: {
        fontSize: 18,
        marginBottom: 10,
        justifyContent: 'space-between',
        textDecoration: 'underline',
    },
    label: {
        fontSize: 12,
        marginRight: 5,
    },
    value: {
        fontSize: 12,
        marginBottom: 5
    }
})
function InvoicePDF({ invoiceData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>The Motel Elsa Invoice #{invoiceData.invoiceNumber}</Text><Text style={styles.heading}>Date:<Text style={styles.value}>{invoiceData.date}</Text></Text>
                    </View>
                    <View style={styles.section}>

                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Check-in Date: <Text style={styles.value}>{format(invoiceData.checkInDate, 'MMM dd yyyy')}</Text></Text>
                        <Text style={styles.label}>Check-out Date: <Text style={styles.value}>{format(invoiceData.checkOutDate, 'MMM dd yyyy')}</Text></Text>
                        <Text style={styles.label}>Number of Nights: <Text style={styles.value}>{invoiceData.numberOfNights}</Text></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Guest Name: <Text style={styles.value}>{invoiceData.guestName}</Text></Text>
                        <Text style={styles.label}>Guest Email: <Text style={styles.value}>{invoiceData.guestEmail}</Text></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Number of Guests: <Text style={styles.value}>{invoiceData.numberOfGuests}</Text></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Room: <Text style={styles.value}>{invoiceData.roomName}</Text></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Room Price: <Text style={styles.value}>{invoiceData.roomPrice}</Text></Text>
                        <Text style={styles.label}>Extras Price: <Text style={styles.value}>{invoiceData.extrasPrice}</Text></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Total Price: <Text style={styles.value}>{invoiceData.totalPrice}</Text></Text>

                    </View>
                </View>
            </Page>
        </Document >
    )
}

export default InvoicePDF