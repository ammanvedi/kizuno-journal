import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const payload: WebhookEvent = await request.json()

    // todo verify the webhook https://clerk.com/docs/integrations/webhooks/sync-data

    if(payload.type === 'user.created') {
        const createdUser = await prisma.user.create({
            data: {
                externalId: payload.data.id,
                firstName: payload.data.first_name,
                lastName: payload.data.last_name
            }
        })

        console.log('user', createdUser)

        await clerkClient().users.updateUser(payload.data.id, {
            externalId: createdUser.id
        })

    }

    console.log(payload)
    return new Response('', {
        status: 200
    })

}

export async function GET() {
    return Response.json({ message: 'Hello World!' })
}3