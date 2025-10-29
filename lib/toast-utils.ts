import { toast } from "@/hooks/use-toast";

/**
 * Toast utility functions for common notification patterns
 */

export const toastSuccess = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
    className: "border-green-500 bg-green-50",
  });
};

export const toastError = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "destructive",
  });
};

export const toastInfo = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
    className: "border-blue-500 bg-blue-50",
  });
};

export const toastWarning = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
    className: "border-yellow-500 bg-yellow-50",
  });
};

/**
 * Predefined toast messages for common user actions
 */

export const toastMessages = {
  // Profile actions
  profileSubmitted: () =>
    toastSuccess(
      "Profile submitted successfully",
      "Your company profile has been created and your TRL assessment is complete."
    ),
  profileUpdated: () =>
    toastSuccess("Profile updated", "Your changes have been saved."),
  profileError: () =>
    toastError("Profile submission failed", "Please check your information and try again."),

  // Grant discovery actions
  grantSearchCompleted: (count: number) =>
    toastSuccess(
      "Grant search completed",
      `Found ${count} matching grant${count === 1 ? "" : "s"} for your profile.`
    ),
  grantSearchError: () =>
    toastError("Grant search failed", "Unable to search for grants. Please try again."),

  // Analysis actions (Stage 3)
  analysisPurchased: () =>
    toastSuccess(
      "Analysis purchased",
      "Processing your grant analysis. This may take a few minutes."
    ),
  analysisCompleted: () =>
    toastSuccess("Analysis ready", "Your grant analysis is complete and ready to view."),
  analysisError: () =>
    toastError("Analysis failed", "Unable to complete the analysis. Please contact support."),

  // Application generation (Stage 4)
  generationStarted: () =>
    toastInfo(
      "Application generation started",
      "This will take 15-30 minutes. You can close this page and we'll email you when it's ready."
    ),
  generationCompleted: () =>
    toastSuccess(
      "Application ready",
      "Your grant application has been generated and is ready to download."
    ),
  generationError: () =>
    toastError(
      "Generation failed",
      "Unable to generate the application. Please contact support."
    ),

  // Download actions
  downloadCompleted: (filename: string) =>
    toastSuccess("Download completed", `${filename} has been downloaded.`),
  downloadError: () =>
    toastError("Download failed", "Unable to download the file. Please try again."),

  // Payment actions
  paymentProcessing: () =>
    toastInfo("Processing payment", "Please wait while we process your payment."),
  paymentSuccess: () =>
    toastSuccess("Payment successful", "Your payment has been processed successfully."),
  paymentCancelled: () =>
    toastInfo("Payment cancelled", "Your payment was cancelled."),
  paymentError: () =>
    toastError(
      "Payment failed",
      "Unable to process your payment. Please check your payment details and try again."
    ),

  // Generic actions
  saved: () => toastSuccess("Saved", "Your changes have been saved successfully."),
  deleted: () => toastSuccess("Deleted", "Item deleted successfully."),
  copied: () => toastSuccess("Copied", "Copied to clipboard."),
  networkError: () =>
    toastError(
      "Network error",
      "Unable to connect to the server. Please check your internet connection and try again."
    ),
  genericError: () =>
    toastError("Something went wrong", "An unexpected error occurred. Please try again."),
};
