import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    create(createModuleDto: CreateModuleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateModuleDto: UpdateModuleDto): string;
    remove(id: string): string;
}
