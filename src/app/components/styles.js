export const remToPx = (rem) => rem * 16;

export const containerStyles = {
  fontFamily: "Montserrat, sans-serif",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: remToPx(2),
  paddingVertical: remToPx(2),
};

export const baseTextStyles = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: remToPx(1),
  marginBottom: remToPx(1),
};

export const headerStyles = {
  ...baseTextStyles,
  fontSize: remToPx(1.8),
};

export const subheaderStyles = {
  ...baseTextStyles,
  fontSize: remToPx(1.2),
};

export const buttonStyles = {
  borderColor: "#c3c3c4",
  borderWidth: 1,
  backgroundColor: "#fff",
  display: "flex",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  backgroundColor: "white",
  marginBottom: remToPx(1),
  paddingVertical: remToPx(0.6),
  paddingHorizontal: remToPx(1),
  borderRadius: 4,
};

export const disabledButtonStyles = {
  ...buttonStyles,
  opacity: 0.5,
};

export const buttonTextStyles = {
  ...baseTextStyles,
  marginBottom: 0,
  fontSize: remToPx(1.2),
};
