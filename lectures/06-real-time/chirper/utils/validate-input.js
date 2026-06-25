/**
 * Github Copilot Prompt:
 * for input validation, propose a way to refactor content validation to a helper function
 *
 * Generic input validation helper.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Array} schema - Array of field definitions:
 *   Example:
 *   [
 *     { name: "content", required: true, type: "string", location: "body" },
 *     { name: "image", required: true, type: "file", location: "file" },
 *     { name: "ChirpId", required: false, type: "number", location: "body" },
 *   ]
 * @returns {Boolean} true if valid, false if response sent
 */
export function validateInput(req, res, schema) {
  for (const field of schema) {
    const value = field.location === "file" ? req.file : req.body[field.name];

    if (
      field.required &&
      (value === undefined || value === null || value === "")
    ) {
      res
        .status(422)
        .json({ error: `Invalid input parameters. Expected ${field.name}` });
      return false;
    }
    if (
      field.type === "number" &&
      value !== undefined &&
      value !== null &&
      value !== "" &&
      isNaN(value)
    ) {
      res.status(422).json({
        error: `Invalid input parameters. Expected ${field.name} to be a number`,
      });
      return false;
    }
  }
  return true;
}
