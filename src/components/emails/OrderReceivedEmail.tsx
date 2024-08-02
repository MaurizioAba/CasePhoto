import {ShippingAddress} from "@prisma/client"
import { Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text } from "@react-email/components"

const OrderReceivedEmail = ({
    shippingAddress,
    orderId,
    orderDate,
}: {
    shippingAddress: ShippingAddress
    orderId: string
    orderDate: string
}) => {


    const baseUrl =
    process.env.NODE_ENV === 'development'
    'http://localhost:3000'



    return (
    <Html>
      <Head />
      <Preview>Riepilogo dell'ordine e data di consegna stimata</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}`}
              width='65'
              height='73'
              alt=''
              style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>Grazie per il tuo ordine!</Heading>
            <Text style={global.text}>
              Stiamo preparando tutto per la consegna e ti faremo sapere quando il tuo pacco sarà stato spedito. La consegna richiede solitamente 2 giorni.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
            Se hai domande riguardanti il ​​tuo ordine, non esitare a contattarci con il numero del tuo ordine e saremo qui per aiutarti.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Spedire a: {shippingAddress.name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {shippingAddress.street}, {shippingAddress.city},{' '}
              {shippingAddress.state} {shippingAddress.postalCode}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex gap-16', marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Numero ordine</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column style={{marginLeft: 20}}>
                <Text style={global.paragraphWithBold}>Data ordine</Text>
                <Text style={track.number}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={global.hr} />

          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}>
                Contattaci se hai domande. (Se rispondi a questa e-mail, non saremo in grado di vederla.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © SnapPhoto. Tutti i diritti sono riservati
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderReceivedEmail