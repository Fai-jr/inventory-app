import { db } from "@/db/db";
import { SaleItem, SaleRequestBody } from "@/types/types";
import { generateSaleNumber } from "@/utils/generateSaleNumber";
import { Request, Response } from "express";
import { startOfDay,startOfWeek,startOfMonth,endOfDay,endOfWeek,endOfMonth,} from "date-fns";


export async function createSale(
  req: Request, res:Response
) {
  const { 
    customerId,
    customerName,
customerEmail,
saleAmount,
balanceAmount,
paidAmount,
saleType,
paymentMethod,
shopId,
transactionCode,
saleItems,
 }:SaleRequestBody = req.body;

  try {
    const saleId = await db.$transaction (async (transaction) => {
      //Create the Sale 100,000 => 30000
      if(balanceAmount>0){
        //If the customer is allowed to take credit
        const existingCustomer = await transaction.customer.findUnique({
          where: {
            id: customerId
          }
        })
        if(!existingCustomer){
          return res.status(404).json({
            error:"Customer Not Found",
            data: null
          })
        } 
        if(balanceAmount>existingCustomer?.maxCreditLimit){
          return res.status(403).json({
            error:`This Customer is Not Eligible for Credit: ${balanceAmount}`,
            data: null,
          })
        }
        //Update the customer unpaidAmount
        //update the cusomer MaxCredit amound
      const updatedCustomer = await transaction.customer.update({
        where:{
          id:customerId,
        },
        data:{
          unpaidCreditAmount: existingCustomer.unpaidCreditAmount + balanceAmount,

            maxCreditLimit: {
              decrement: balanceAmount,
            },
        }
      });
      if(!updatedCustomer){
        return res.json({
            error:"Failed to update Customer Credit Details",
            data:null,
          }).status(500);
      }
      }
      //If balaAmount>0
      //Update the customer unpaidAmount
      //update the cusomer MaxCredit amound
    const sale = await transaction.sale.create({
        data: {
          customerId,
          customerName,
          customerEmail,
          paymentMethod,
          saleNumber: generateSaleNumber(),
          saleAmount,
          saleType,
          shopId,
          balanceAmount,
          paidAmount,
          transactionCode,
        },
      });

      if(saleItems && saleItems.length>0){
        for (const item of saleItems) {
        // Update Product stock quantity
        const updatedProduct = await transaction.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.qty,
            },
          },
        });
 
        if (!updatedProduct) {
          return res.json({
            error:"Failed to update Product Quantity",
            data:null
          }).status(500)
        }
 
        // Create sale Item
        const saleItem = await transaction.saleItem.create({
          data: {
            saleId: sale.id,
            productId: item.productId,
            qty: item.qty,
            productPrice: item.qty,
            productName: item.productName,
            productImage: item.productImage,
          },
        });
 
        if (!saleItem) {
          return res.json({
            error:"Failed to Create Sale Item",
            data:null
          }).status(500)
        }
      }
      }

      return sale.id;
    });
 
    const sale = await db.sale.findUnique({
      where: {
        id: saleId as string,
      },
      include: {
        salesItems: true,
      },
    });
    // console.log(savedLineOrder);
    return res.json(sale).status(201);
    
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      error:"Something went Wrong",
      data:null
    })
  }
}
export async function getSales (req: Request, res:Response){
    try {
        const sales = await db.sale.findMany({
            orderBy: { 
                createdAt:"desc"
            },
            include:{
              salesItems: true
            },
        });
        return res.status(200).json({
            data: sales,
            error: null,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
    }
}

export async function createSaleItem (
  req: Request, res:Response
) {
  const { saleId,
productId,
qty,
productPrice,
productName,
productImage } = req.body;

  try {
     // Update Product stock quantity
        const updatedProduct = await db.product.update({
          where: { id:productId },
          data: {
            stockQty: {
              decrement: qty,
            },
          },
        });
         // Create sale Item
        const saleItem = await db.saleItem.create({
          data: {
            saleId: saleId,
            productId: productId,
            qty: qty,
            productPrice: qty,
            productName: productName,
            productImage: productImage,
          },
        });
 
    // console.log(savedLineOrder);
    return res.json(saleItem).status(201);
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      error:"Something went Wrong",
      data:null
    })
  }
}

export async function getShopSales(req: Request, res: Response) {
  const { shopId } = req.params;
  // const { shopId } = req.query;

  if(!shopId){
    return res.status(404).json({
      error: "Please provide shop id",
      data:null,
    })
  }
 
  const existingShop = await db.shop.findUnique({
    where:{
      id:shopId,
    }
  })
  if(!existingShop){
    return res.status(404).json({
      error: "Shop Not Found",
      data:null,
    })
  }

  // Define time periods
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());
 
  try {
    // Fetch sales for different periods
    const categorizeSales = async (sales: any[]) => {
      return {
        totalSales:sales,
        salesPaidInCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
        salesPaidInCredit: sales.filter(
          (sale) =>  sale.balanceAmount > 0
        ),
        salesByMobileMoney: sales.filter(
          (sale) => sale.paymentMethod === "MOBILEMONEY"
        ),
        salesByHandCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balanceAmount <= 0
        ),
      };
    };
 
    const salesToday = await db.sale.findMany({
      where: {
        shopId,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
 
    const salesThisWeek = await db.sale.findMany({
      where: {
        shopId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });
 
    const salesThisMonth = await db.sale.findMany({
      where: {
        shopId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });
 
    const salesAllTime = await db.sale.findMany({
      where: {
        shopId,
      },
    });
 
    res.status(200).json({
      today: await categorizeSales(salesToday),
      thisWeek: await categorizeSales(salesThisWeek),
      thisMonth: await categorizeSales(salesThisMonth),
      allTime: await categorizeSales(salesAllTime),
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function getShopsSales(req: Request, res: Response) {
  // Define time periods
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  try {
    // Fetch all sales for different periods
    const fetchSalesData = async (startDate: Date, endDate: Date ) => {
      return await db.sale.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte:endDate,
          },
        },
        select: {
          shopId: true,
          saleAmount: true,
          paymentMethod: true,
          balanceAmount: true,
          saleType: true,
        },
      });
    };

    // Categorize sales
    const categorizeSales = (sales: any[]) => {
      return{
        totalSales: sales,
        salesPaidInCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balaAmount <=0
        ),
        salesPaidInCredit: sales.filter(
          (sale) =>  sale.balaAmount > 0
        ),
        salesByMobileMoney: sales.filter(
          (sale) => sale.paymentMethod === "MOBILEMONEY"
        ),
        salesByHandCash: sales.filter(
          (sale) => sale.paymentMethod === "CASH" && sale.balaAmount <=0
        ),
      }
    };

    // Fetch sales for each period
    const salesToday = await fetchSalesData (todayStart, todayEnd);
    const salesThisWeek = await fetchSalesData (weekStart, weekEnd);
    const salesThisMonth = await fetchSalesData (monthStart, monthEnd);
    const salesAllTime = await db.sale.findMany({
      select:{
        shopId: true,
        saleAmount: true,
        balanceAmount: true,
        paymentMethod: true,
        saleType: true,
      }
    })

    res.status(200).json({
      today: categorizeSales(salesToday),
      thisWeek: categorizeSales(salesThisWeek),
      thisMonth: categorizeSales(salesThisMonth),
      allTime: categorizeSales(salesAllTime),
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}