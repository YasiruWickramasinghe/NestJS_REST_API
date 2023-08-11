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
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { RolesGuard } from 'src/user/guard';
import { Roles } from 'src/user/decorator';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService) { }

    @Get()
    async getAllBookmarks(@Res() res: Response) {
        try {
            const bookmarks = await this.bookmarkService.getAllBookmarks();
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved bookmarks', bookmarks });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    @Get('user')
    async getBookmarksByUserId(@GetUser('id') userId: number, @Res() res: Response) {
        try {
            const bookmarks = await this.bookmarkService.getBookmarksByUserId(userId);
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved user bookmarks', bookmarks });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    @Get(':id')
    async getBookmarkByBookId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Res() res: Response
    ) {
        try {
            const bookmark = await this.bookmarkService.getBookmarkByBookId(userId, bookmarkId);
            return res.status(HttpStatus.OK).json({ message: 'Successfully retrieved bookmark', bookmark });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    @Post()
    async createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
        @Res() res: Response
    ) {
        try {
            const bookmark = await this.bookmarkService.createBookmark(userId, dto);
            return res.status(HttpStatus.CREATED).json({ message: 'Bookmark created successfully', bookmark });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Patch(':id')
    async editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
        @Res() res: Response
    ) {
        try {
            const editedBookmark = await this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
            return res.status(HttpStatus.OK).json({ message: 'Bookmark edited successfully', bookmark: editedBookmark });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Res() res: Response
    ) {
        try {
            await this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
            return res.status(HttpStatus.NO_CONTENT).json({ message: 'Bookmark deleted successfully' });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
    }
}
