import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { RolesGuard } from 'src/user/guard';
import { Roles } from 'src/user/decorator';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(
        private bookmarkService: BookmarkService,
    ) { }

    @Get()
    getAllBookmarks() {
        return this.bookmarkService.getAllBookmarks();
    }

    @Get('user')
    getBookmarksByUserId(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarksByUserId(
            userId,
        );
    }

    @Get(':id')
    getBookmarkByBookId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarkByBookId(
            userId,
            bookmarkId,
        );
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(
            userId,
            dto,
        );
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
    ) {
        return this.bookmarkService.editBookmarkById(
            userId,
            bookmarkId,
            dto,
        );
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.deleteBookmarkById(
            userId,
            bookmarkId,
        );
    }
}
