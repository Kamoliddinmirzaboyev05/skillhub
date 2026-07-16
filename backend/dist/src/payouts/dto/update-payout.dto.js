"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayoutDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payout_dto_1 = require("./create-payout.dto");
class UpdatePayoutDto extends (0, mapped_types_1.PartialType)(create_payout_dto_1.CreatePayoutDto) {
}
exports.UpdatePayoutDto = UpdatePayoutDto;
//# sourceMappingURL=update-payout.dto.js.map