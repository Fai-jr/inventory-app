import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createSupplier(req: Request, res: Response) {
  const {
    supplierType,
    name,
    contactPerson,
    phone,
    email,
    location,
    country,
    website,
    taxPin,
    regNumber,
    bankAccountNumber,
    bankName,
    paymentTerms,
    logo,
    rating,
    notes,
  } = req.body;

  try {
    // Check if phone is unique
    const existingSupplierByPhone = await db.supplier.findUnique({
      where: {
        phone,
      },
    });
    if (existingSupplierByPhone) {
      return res.status(409).json({
        error: `Phone number ${phone} is already in use`,
      });
    }

    // Check if email is unique (if provided)
    if (email) {
      const existingSupplierByEmail = await db.supplier.findUnique({
        where: {
          email,
        },
      });
      if (existingSupplierByEmail) {
        return res.status(409).json({
          error: `Email ${email} is already in use`,
        });
      }
    }

    // Check if regNumber is unique (if provided)
    if (regNumber) {
      const existingSupplierByRegNo = await db.supplier.findUnique({
        where: {
          regNumber,
        },
      });
      if (existingSupplierByRegNo) {
        return res.status(409).json({
          error: `Registration Number ${regNumber} is already in use`,
        });
      }
    }

    // Create the Supplier
    const newSupplier = await db.supplier.create({
      data: {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        taxPin,
        regNumber,
        bankAccountNumber,
        bankName,
        paymentTerms,
        logo,
        rating,
        notes,
      },
    });

    // Return the created Supplier
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSuppliers(req: Request, res: Response) {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSupplierById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!supplier) {
      return res.status(404).json({ 
        error: "Supplier not found",
        data:null
     });
    }
    return res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}