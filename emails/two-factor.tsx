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
  Tailwind
} from "@react-email/components";

interface TwoFactorEmailProps {
  token: string;
  name: string;
}
export const TwoFactorEmail = ({ token, name }: TwoFactorEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Olá {name}, identificamos uma tentativa recente de login na sua conta do Gestão Simples</Preview>
      <Body style={main}>
        <Tailwind>
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
                    Identificamos uma tentativa recente de login na sua conta do Gestão Simples.
                  </Heading>

                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      paddingTop: 20
                    }}
                  >
                    Seu código de verificação
                  </Heading>

                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      paddingTop: 20
                    }}
                  >
                    {token}
                  </Heading>

                  <Text style={paragraph}>
                    Se não foi você que tentou fazer login, recomendamos que você altere sua senha imediatamente.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section style={containerImageFooter}>
              <Img
                width={620}
                src={`https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&w=1920&q=75`}
              />
            </Section>

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2024 | 🔐 Auth
            </Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default TwoFactorEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
