import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Demo',
    },
  });
  console.log(`✅ Tenant criado com ID: ${tenant.id}`);

  // Criar Company
  const company = await prisma.company.create({
    data: {
      name: 'Empresa Demo Ltda',
      legal_name: 'Empresa Demonstrativa Ltda',
      registration_type: 'CNPJ',
      registration_number: '12345678000199',
      state_registration: '123456789',
      municipal_registration: '987654321',
      tax_regime: 'Simples Nacional',
      address_street: 'Rua da Demonstração',
      address_number: '123',
      address_neighborhood: 'Centro',
      address_city: 'São Paulo',
      address_state: 'SP',
      address_zip_code: '01001000',
      active: true,
      tenantId: tenant.id,
    },
  });
  console.log(`✅ Company criada com ID: ${company.id}`);

  // Criar Usuário Admin
  const passwordHash = await hash('senha123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'ADMIN',
      emailVerified: new Date(),
      birthDate: new Date('1990-01-01'),
    },
  });
  console.log(`✅ Usuário admin criado com ID: ${admin.id}`);

  // Associar Admin ao Tenant
  await prisma.userTenant.create({
    data: {
      userId: admin.id,
      tenantId: tenant.id,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin associado ao Tenant`);

  // Associar Admin à Company
  await prisma.userCompany.create({
    data: {
      userId: admin.id,
      companyId: company.id,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin associado à Company`);

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 