import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createProduct(req: Request, res:Response){
    try {
        //Get the data
        const {
             name,
description,
batchNumber,
barCode,
image,
tax,
alertQty,
stockQty,
price,
buyingPrice,
sku,
productCode,
slug,
supplierId,
unitId,
brandId,
categoryId,
expiryDate,
wholesalePrice,
shopId,
        } =  req.body;
        //Check if product already exists
        const existingProductSlug = await db.product.findUnique({
            where:{
                slug
            },
        });
        if(existingProductSlug){
            return res.status(409).json({
                error: `Product (${name}) is already existing`,
                data:null
            });
        }
        const existingProductSKU = await db.product.findUnique({
            where:{
                sku
            },
        });
        if(existingProductSKU){
            return res.status(409).json({
                error: `Product SKU (${sku}) is already existing`,
                data:null
            });
        }

        const existingProductByProductCode = await db.product.findUnique({
            where:{
                productCode
            },
        });
        if(existingProductByProductCode){
            return res.status(409).json({
                error: `Product Code (${productCode}) is already existing`,
                data:null
            });
        }

        if(barCode){
            const existingProductByBarCode = await db.product.findUnique({
            where:{
                barCode
            },
        });
        if(existingProductByBarCode){
            return res.status(409).json({
                error: `Bar Code (${barCode}) is already existing`,
                data:null
            });
        }
        }   

        //Create the product
        const newProduct = await db.product.create({
            data:{
                         name,
description,
batchNumber,
barCode,
image,
tax,
alertQty,
stockQty,
price,
buyingPrice,
sku,
productCode,
slug,
supplierId,
unitId,
brandId,
categoryId,
expiryDate,
wholesalePrice,
shopId,
            }
        })

        //Return the Created product
        return res.status(201).json({
            data: newProduct,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data:null,
            error:"Something went wrong"
        })
    }
}

export async function getProducts (req: Request, res:Response){
    try {
        const products = await db.product.findMany({
            orderBy: { 
                createdAt:"desc"
            }
        });
        return res.status(200).json({
            data: products,
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

export async function getSingleProduct (req: Request, res:Response){
    try {
        const { id } = req.params
        const existingProduct = await db.product.findUnique({
            where:{
                id:id
            },
        });

        if(!existingProduct){
            return res.status(404).json({
                data:null,
                error: "Product does not exist"
            })
        }



        return res.status(200).json({
            data: existingProduct,
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

export async function updateProductById(req: Request, res: Response){

    try {
      const {id} =req.params
      const {
          name,
description,
batchNumber,
barCode,
image,
tax,
alertQty,
stockQty,
price,
buyingPrice,
sku,
productCode,
slug,
supplierId,
unitId,
brandId,
categoryId,
expiryDate,
wholesalePrice,
shopId,
  } = req.body;
  
      // Existing product
      const existingProduct = await db.product.findUnique({
        where:{
            id
        },
      }); 
      // If user does not exist we ren 404
       if(!existingProduct){
        return res.status(404).json({
            data:null,
            error:"Product Not found"
        });
      }
      //If the slug, barcode, sku and productcode are unique
      if(slug !== existingProduct.slug){
        const existingProductBySlug = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (existingProductBySlug) {
      return res.status(409).json({
        error: `Product (${name}) is already taken`,
        data: null,
      });
    }
      }

       if(sku !== existingProduct.sku){
        const existingProductBySKU = await db.product.findUnique({
      where: {
        sku,
      },
    });
    if (existingProductBySKU) {
      return res.status(409).json({
        error: `Product SKU (${sku}) is already taken`,
        data: null,
      });
    }
      }

         if(productCode !== existingProduct.productCode){
        const existingProductByProductCode = await db.product.findUnique({
      where: {
        productCode,
      },
    });
    if (existingProductByProductCode) {
      return res.status(409).json({
        error: `Product Code (${productCode}) is already taken`,
        data: null,
      });
    }
      }

         if(barCode && barCode !== existingProduct.barCode){
        const existingProductByBarCode = await db.product.findUnique({
      where: {
        barCode,
      },
    });
    if (existingProductByBarCode) {
      return res.status(409).json({
        error: `Bar Code (${barCode}) is already taken`,
        data: null,
      });
    }
      }

      //update product
        const updatedProduct = await db.product.update({
        where:{
            id
        }, 
        data:{

           name,
description,
batchNumber,
barCode,
image,
tax,
alertQty,
stockQty,
price,
buyingPrice,
sku,
productCode,
slug,
supplierId,
unitId,
brandId,
categoryId,
expiryDate,
wholesalePrice,
shopId,
        },
      });

      return res.status(200).json({
        data:updatedProduct,
        error:null,
      });

    } catch (error) {
        console.log(error);
          return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
    }
}

export async function deleteProductById(req: Request, res: Response){
    const {id} =req.params
    try {
      const product = await db.product.findUnique({
        where:{
            id
        },
      }); 
      if(!product){
        return res.status(404).json({
            data:null,
            error:"Product Not found"
        })
      }
     await db.product.delete({
        where:{
            id
        },
     });
        res.status(200).json({
        success: true,
        error:null,
      });
    } catch (error) {
        console.log(error);
          return res.status(500).json({
      error: "Internal server error",
      data: null,
    });
    }
}
  