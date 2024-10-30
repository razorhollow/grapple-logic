import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationFooterProps {
    pageCount: number;
}


export default function PaginationFooter({pageCount}: PaginationFooterProps) {
    return (
        <Pagination className="absolute bottom-2 left-0">
            <PaginationContent>
                {Array.from({ length: pageCount }).map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink to={`/techniques?page=${i + 1}`} end>{i + 1}</PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}