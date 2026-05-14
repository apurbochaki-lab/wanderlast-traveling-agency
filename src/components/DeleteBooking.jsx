"use client";

import { handleCancelBooking } from "@/lib/actions";
import { AlertDialog, Button } from "@heroui/react";
import { Trash } from "lucide-react";

const DeleteBooking = ({ bookingId }) => {

    return (
        <div>
            <AlertDialog>
                <Button variant="outline" className="rounded-none border border-red-500 text-red-500 font-semibold">
                    <Trash />Cancel
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Cancel Booking?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This booking will be permanently removed.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Close
                                </Button>

                                <form action={async () => await handleCancelBooking(bookingId)}>
                                    <Button type="submit" slot="close" variant="danger">
                                        Cancel Booking
                                    </Button>
                                </form>

                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteBooking;