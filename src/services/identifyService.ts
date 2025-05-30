// import prisma from "../prisma/client";
// import { IdentifyRequest, IdentifyResponse } from "../types";

// export const identifyUser = async ({
//   email,
//   phoneNumber,
// }: IdentifyRequest): Promise<IdentifyResponse> => {
//   if (!email && !phoneNumber) {
//     throw new Error("Email or phoneNumber is required");
//   }

//   const matchedContacts = await prisma.contact.findMany({
//     where: {
//       OR: [
//         { email: email || undefined },
//         { phoneNumber: phoneNumber || undefined },
//       ],
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   });

//   let primaryContact = null;

//   if (matchedContacts.length > 0) {
//     primaryContact = matchedContacts.find(
//       (c) => c.linkPrecedence === "primary"
//     );

//     if (!primaryContact) {
//       primaryContact = matchedContacts[0];
//     }

//     // Check if new info needs to be added
//     const emailExists = matchedContacts.some((c) => c.email === email);
//     const phoneExists = matchedContacts.some((c) => c.phoneNumber === phoneNumber);

//     if (!emailExists || !phoneExists) {
//       await prisma.contact.create({
//         data: {
//           email,
//           phoneNumber,
//           linkPrecedence: "secondary",
//           linkedId: primaryContact.id,
//         },
//       });
//     }
//   } else {
//     // No existing contact, create new primary
//     primaryContact = await prisma.contact.create({
//       data: {
//         email,
//         phoneNumber,
//         linkPrecedence: "primary",
//       },
//     });
//   }

//   const allRelatedContacts = await prisma.contact.findMany({
//     where: {
//       OR: [
//         { id: primaryContact.id },
//         { linkedId: primaryContact.id },
//       ],
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//   });

//   const emails = Array.from(
//     new Set(allRelatedContacts.map((c) => c.email).filter(Boolean))
//   );
//   const phoneNumbers = Array.from(
//     new Set(allRelatedContacts.map((c) => c.phoneNumber).filter(Boolean))
//   );
//   const secondaryContactIds = allRelatedContacts
//     .filter((c) => c.linkPrecedence === "secondary")
//     .map((c) => c.id);

//   const metadata = allRelatedContacts.map((c) => ({
//     id: c.id,
//     linkedId: c.linkedId,
//     linkPrecedence: c.linkPrecedence,
//     createdAt: c.createdAt,
//     updatedAt: c.updatedAt,
//     deletedAt: null, // Not implemented yet
//   }));

//   return {
//     contact: {
//       primaryContactId: primaryContact.id,
//       emails ,
//       phoneNumbers,
//       secondaryContactIds,
//       metadata, // 👈 Additional metadata section
//     },
//   };
// };

import prisma from "../prisma/client";
import { IdentifyRequest, IdentifyResponse } from "../types";

export const identifyUser = async ({
  email,
  phoneNumber,
}: IdentifyRequest): Promise<IdentifyResponse> => {
  if (!email && !phoneNumber) {
    throw new Error("Email or phoneNumber is required");
  }

  const matchedContacts = await prisma.contact.findMany({
    where: {
      OR: [
        { email: email || undefined },
        { phoneNumber: phoneNumber || undefined },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let primaryContact = null;

  if (matchedContacts.length > 0) {
    primaryContact = matchedContacts.find(
      (c) => c.linkPrecedence === "primary"
    );

    if (!primaryContact) {
      primaryContact = matchedContacts[0];
    }

    // Check if new info needs to be added
    const emailExists = matchedContacts.some((c) => c.email === email);
    const phoneExists = matchedContacts.some((c) => c.phoneNumber === phoneNumber);

    if (!emailExists || !phoneExists) {
      await prisma.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: "secondary",
          linkedId: primaryContact.id,
        },
      });
    }
  } else {
    // No existing contact, create new primary
    primaryContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: "primary",
      },
    });
  }

  const allRelatedContacts = await prisma.contact.findMany({
    where: {
      OR: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const emails = Array.from(
    new Set(
      allRelatedContacts
        .map((c) => c.email)
        .filter((e): e is string => e !== null)
    )
  );

  const phoneNumbers = Array.from(
    new Set(
      allRelatedContacts
        .map((c) => c.phoneNumber)
        .filter((p): p is string => p !== null)
    )
  );

  const secondaryContactIds = allRelatedContacts
    .filter((c) => c.linkPrecedence === "secondary")
    .map((c) => c.id);

  const metadata = allRelatedContacts.map((c) => ({
    id: c.id,
    linkedId: c.linkedId,
    linkPrecedence: c.linkPrecedence,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    deletedAt: null, 
  }));

  return {
    contact: {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
      metadata,
    },
  };
};

