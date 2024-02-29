import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserOrdersByStatusQuery = async (id: string, status: string) => {
  const orders =  await prisma.order.findMany({
    where: {
      id:id,
      status: status,
    },
  });
  return orders;
};
