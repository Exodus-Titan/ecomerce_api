import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateOrderStatusQuery = async (id: string, status: string) => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return order;
};
