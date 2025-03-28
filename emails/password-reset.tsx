import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface PasswordResetEmailProps {
  resetPasswordLink: string;
  name: string;
}
export const PasswordResetEmail = ({
  resetPasswordLink,
  name
}: PasswordResetEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Olá {name}, recebemos sua solicitação de redefinição de senha do sistema Gestão Simples.</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
              Gestão Simples
            </Text>
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Olá {name},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'start',
                  }}
                >
                  Recebemos sua solicitação de redefinição de senha do sistema Gestão Simples.
                </Heading>

                <Text style={paragraph}>
                  Clique no botão abaixo para redefinir sua senha:
                </Text>

                <Button 
                  style={button}
                  href={resetPasswordLink}
                >
                  Redefinir Senha
                </Button>

                <Text style={{ ...paragraph, marginTop: 10 }}>
                  Se você não solicitou a redefinição de senha, por favor ignore este email.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Este link expira em 1 hora.
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={`https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&w=1920&q=75`} />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2024 | 🔐 Auth 
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const boxInfos = {
  padding: '20px 40px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '10px 20px',
  textDecoration: 'none',
};