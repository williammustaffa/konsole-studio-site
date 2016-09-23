<?php
$email = $_POST["email"];
$mailto = "team@konsole.studio";
$subject = "Newsletter sigup request";
$from = "team@konsole.studio";
$message_body = "Hey team! \n Someone has requested to singup your newsletter! Add this email to your newsletter list: $email";
$status = [
  "done" => false,
  "message" => "",
];

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $sent = mail($mailto, $subject, $message_body, "From:".$from);
  if ($sent) {
    $status["done"] = true;
    $status["message"] = "Thanks for subscribing to our newsletter!";
  } else {
    $status["message"] = "An error has occurred... Please try later.";
  }
} else {
  $status["message"] = "Please use a valid email address.";
}
echo json_encode($status);
?>
